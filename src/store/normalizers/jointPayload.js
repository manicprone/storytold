import objectUtils from '../../utils/object-utils';
import Collection from '../../models/Collection';
import Model from '../../models';

const debug = false;
const debugToModel = false;
const fieldForModelType = 'type';

export default function normalizePayload(payload, asModel = false) {
  let normalizedData = {};

  if (debug) {
    console.log('!!! ==================================================== !!!');
    console.log('Joint payload to normalize: ', payload);
  }

  if (payload.data) {
    // ------------------------------------------
    // Build relation data hash for processing...
    // ------------------------------------------
    const relationData = (payload.included)
        ? buildRelationDataHash(payload.included, asModel)
        : null;

    // ----------------------------
    // Handle collection payload...
    // ----------------------------
    if (Array.isArray(payload.data)) {
      const collection = {};
      collection.items = [];
      collection.meta = {};

      // Normalize meta data...
      if (payload.meta) {
        // Handle pagination information...
        collection.meta = Object.assign(collection.meta, normalizePaginationData(payload.meta));

        // Handle filter information...
        if (payload.meta.filters) {
          collection.meta.filters = normalizeFilterData(payload.meta.filters, asModel);
        }
      } // end-if (payload.meta)

      // Normalize each item...
      payload.data.forEach((itemData) => {
        collection.items.push(normalizeItem(itemData, relationData, asModel));
      });

      normalizedData = (asModel) ? new Collection(collection) : collection;
    // ----------------------
    // Handle item payload...
    // ----------------------
    } else {
      normalizedData = normalizeItem(payload.data, relationData, asModel);
    }
  } else {
    console.error('[STORE] Serializer Error: The payload is not a valid package =>', payload);
  }

  if (debug) {
    console.log('NORMALIZED =======> ', normalizedData);
    console.log('!!! ==================================================== !!!');
  }

  return normalizedData;
}

function normalizeItem(itemData, relationData, asModel = false) {
  // Populate base item attributes...
  const item = normalizeBaseAttributes(itemData, asModel);

  if (debug) console.log('Normalizing item data ==>', itemData);

  // Populate relation data...
  if (itemData.relationships) {
    const relations = itemData.relationships;
    Object.keys(relations).forEach((relationName) => {
      const relationRef = relations[relationName];
      item[normalizeRelationName(relationName)] = normalizeRelationData(relationName, relationRef, relationData);
    });
  }

  if (debug) console.log('NORMALIZED ITEM ==>', item);

  return item;
}

function normalizeBaseAttributes(itemData, asModel = false) {
  const base = {};

  // Handle base attributes...
  base[fieldForModelType] = itemData[fieldForModelType];
  base.id = itemData.id;
  if (itemData.attributes) Object.assign(base, itemData.attributes);

  if (asModel) {
    return buildModelForItem(base);
  }
  return base;
}

function normalizeRelationData(relationName, relationRef, relationData) {
  let normalized = null;

  if (relationRef.data) {
    // -------------------------------
    // Handle "toMany" relation set...
    // -------------------------------
    if (Array.isArray(relationRef.data)) {
      const relationArray = [];
      for (let i = 0; i < relationRef.data.length; i++) {
        const type = relationRef.data[i][fieldForModelType];
        const id = relationRef.data[i].id;

        relationArray.push(relationData[type][id]);
      }

      switch (relationName) {
        // case CONSTANTS.RELATION_NAME_RESERVED_TAGS:
        //   normalized = relationArray[0];
        //   break;
        default: normalized = relationArray;
      }
    // ------------------------------
    // Handle "toOne" relation set...
    // ------------------------------
    } else {
      const type = relationRef.data[fieldForModelType];
      const id = relationRef.data.id;

      switch (relationName) {
        default: normalized = relationData[type][id];
      }
    }
  } // end-if (relationRef.data)

  return normalized;
}

function normalizeRelationName(relationName) {
  switch (relationName) {
    default: return relationName;
  }
}

function normalizePaginationData(paginationData) {
  const info = {};

  const hasTotal = objectUtils.has(paginationData, 'total_items');
  const hasLimit = objectUtils.has(paginationData, 'limit');

  if (hasTotal) {
    const total = Number(paginationData.total_items);
    info.total_items = total;

    if (hasLimit) {
      const skipValue = paginationData.skip;
      const limitValue = paginationData.limit;

      const skip = (skipValue) ? Number(skipValue) : 0;
      const limit = Number(limitValue);

      const pageStart = skip || 0;
      const pageSize = limit;
      const pageEnd = pageStart + pageSize;

      // total_items, total_pages, page_size...
      info.total_pages = Math.ceil(total / pageSize);
      info.page_size = pageSize;

      // active page number...
      info.curr_page = (pageStart / pageSize) + 1;

      // prev page info...
      if (pageStart > 0) {
        const prevStart = (pageStart - pageSize >= 0) ? pageStart - pageSize : 0;
        info.prev = { skip: prevStart, limit: pageSize };
      } else {
        info.prev = null;
      }

      // next page info...
      if (pageEnd < total) {
        info.next = { skip: pageEnd, limit: pageSize };
      } else {
        info.next = null;
      }
    } // end-if (hasLimit)

  } // end-if (hasTotal)

  return info;
}

function normalizeFilterData(filterData = [], asModel = false) {
  const info = [];

  filterData.forEach((filterItem) => {
    info.push(normalizeItem(filterItem, null, asModel));
  });

  return info;
}

// --------------------------------------------------
// Manages all relation data in a hash.
// The relation data is normalized and then organized
// into a two-tiered object, so it can be efficiently
// retrieved when normalizing its base item.
// --------------------------------------------------
// The relationHash is grouped by type, then by ID.
// e.g.
//
// hash = {
//   'user': {
//     '1': { ... },
//     '2': { ... },
//   },
//   'tag': {
//     '1': { ... },
//     '5': { ... },
//     '9': { ... },
//   }
// }
function buildRelationDataHash(relationData, asModel = false) {
  const relationHash = {};

  if (debug) console.log('Relation Data ==>', relationData);

  // Iterate all relation data, and build hash...
  if (relationData && Array.isArray(relationData) && relationData.length > 0) {
    for (let i = 0; i < relationData.length; i++) {
      const relationItem = relationData[i];

      // Register type storage on first appearance...
      if (!relationHash[relationItem[fieldForModelType]]) {
        relationHash[relationItem[fieldForModelType]] = {}; // eslint-disable-line no-param-reassign
      }

      // Populate hash with normalized item data...
      const typeHash = relationHash[relationItem[fieldForModelType]];
      if (!typeHash[relationItem.id]) {
        typeHash[relationItem.id] = normalizeBaseAttributes(relationItem, asModel);
      }
    } // end-for
  }

  if (debug) console.log('Relation Hash ==>', relationHash);

  return relationHash;
}

function buildModelForItem(itemData) {
  const modelName = itemData[fieldForModelType];
  if (debugToModel) console.log(`Building "${modelName}" Model for data =>`, itemData);

  // If cannot resolve model name, just return original data...
  if (!modelName) return itemData;

  // Otherwise, hydrate data into Model object...
  const ModelObject = Model(modelName);
  return new ModelObject({ ...itemData });
}
