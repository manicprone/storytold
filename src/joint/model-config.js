// ------------
// model-config
// ------------

module.exports = {

  modelsEnabled: [
    'UserCredentials',
    'UserProfile',
    'UserSettings',
    'Role',
    'UserRole',
    'User',
    'Persona',
    'ChapterPlaceRef',
    'ChapterOrganizationRef',
    'ChapterProjectRef',
    'ChapterPersonRef',
    'Place',
    'Organization',
    'Project',
    'Person',
    'StoryChapterRef',
    'Chapter',
    'Story',
  ],

  models: {
    // The user information (for managing identity and permissions)
    User: {
      tableName: 'users',
      timestamps: { created: 'created_at', updated: 'updated_at' },
      associations: {
        profile: {
          type: 'toOne',
          path: 'id => UserProfile.user_id',
        },
        roles: {
          type: 'toMany',
          path: 'id => UserRole.user_id => UserRole.role_id => Role.id',
        },
        personas: {
          type: 'toMany',
          path: 'id => Persona.user_id',
        },
      },
    },

    // Manages local user accounts (credentials and local account controls)
    UserCredentials: {
      tableName: 'user_credentials',
    },

    // Extra profile info supplementing the user account
    UserProfile: {
      tableName: 'user_info',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // A user role
    Role: {
      tableName: 'roles',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // The reference that maps a role to a user
    UserRole: {
      tableName: 'user_roles_ref',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // Persisted user app settings
    UserSettings: {
      tableName: 'user_app_settings',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // A persona
    Persona: {
      tableName: 'personas',
      timestamps: { created: 'created_at', updated: 'updated_at' },
      associations: {
        user: {
          type: 'toOne',
          path: 'user_id => User.id',
        },
      },
    },

    // A place
    Place: {
      tableName: 'places',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // An organization
    Organization: {
      tableName: 'organizations',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // A project
    Project: {
      tableName: 'projects',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // A person
    Person: {
      tableName: 'people',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // A chapter
    Chapter: {
      tableName: 'chapters',
      timestamps: { created: 'created_at', updated: 'updated_at' },
      associations: {
        places: {
          type: 'toMany',
          path: 'id => ChapterPlaceRef.chapter_id => ChapterPlaceRef.place_id => Place.id',
        },
        organizations: {
          type: 'toMany',
          path: 'id => ChapterOrganizationRef.chapter_id => ChapterOrganizationRef.org_id => Organization.id',
        },
        projects: {
          type: 'toMany',
          path: 'id => ChapterProjectRef.chapter_id => ChapterProjectRef.project_id => Project.id',
        },
        people: {
          type: 'toMany',
          path: 'id => ChapterPersonRef.chapter_id => ChapterPersonRef.person_id => Person.id',
        },
      },
    },

    // The reference that maps a place to a chapter
    ChapterPlaceRef: {
      tableName: 'chapter_places_ref',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // The reference that maps an organization to a chapter
    ChapterOrganizationRef: {
      tableName: 'chapter_organizations_ref',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // The reference that maps a project to a chapter
    ChapterProjectRef: {
      tableName: 'chapter_projects_ref',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // The reference that maps a person to a chapter
    ChapterPersonRef: {
      tableName: 'chapter_people_ref',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },

    // A story
    Story: {
      tableName: 'stories',
      timestamps: { created: 'created_at', updated: 'updated_at' },
      associations: {
        persona: {
          type: 'toOne',
          path: 'persona_id => Persona.id',
        },
        chapters: {
          type: 'toMany',
          path: 'id => StoryChapterRef.story_id => StoryChapterRef.chapter_id => Chapter.id',
        },
      },
    },

    // The reference that maps a chapter to a story
    StoryChapterRef: {
      tableName: 'story_chapters_ref',
      timestamps: { created: 'created_at', updated: 'updated_at' },
    },
  }, // END - models

};
