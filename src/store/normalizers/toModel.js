import normalizeJointPayload from './jointPayload';

// --------------------------------------------------
// toModel(payload)
// --------------------------------------------------
// Use this function to de-serialize all payload data
// into their respective app Model objects.
// --------------------------------------------------
export default function toModel(payload) {
  const model = normalizeJointPayload(payload, true);
  return model;
}
