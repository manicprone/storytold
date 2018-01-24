// ------------
// model-config
// ------------

export default [
  // Manages local user accounts (credentials and local account controls)
  {
    name: 'UserCredentials',
    tableName: 'user_credentials',
  },

  // Extra profile info supplementing the user account
  {
    name: 'UserProfile',
    tableName: 'user_info',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // A user role
  {
    name: 'Role',
    tableName: 'roles',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // The reference that maps a role to a user
  {
    name: 'UserRole',
    tableName: 'user_roles_ref',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // Persisted user app settings
  {
    name: 'UserSettings',
    tableName: 'user_app_settings',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // A persona
  {
    name: 'Persona',
    tableName: 'personas',
    timestamps: { created: 'created_at', updated: 'updated_at' },
    associations: {
      user: {
        type: 'toOne',
        path: 'user_id => User.id',
      },
    },
  },

  // The user information (for managing identity and permissions)
  {
    name: 'User',
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

  // A place
  {
    name: 'Place',
    tableName: 'places',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // An organization
  {
    name: 'Organization',
    tableName: 'organizations',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // A project
  {
    name: 'Project',
    tableName: 'projects',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // A person
  {
    name: 'Person',
    tableName: 'people',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // The reference that maps a place to a chapter
  {
    name: 'ChapterPlaceRef',
    tableName: 'chapter_places_ref',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // The reference that maps an organization to a chapter
  {
    name: 'ChapterOrganizationRef',
    tableName: 'chapter_organizations_ref',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // The reference that maps a project to a chapter
  {
    name: 'ChapterProjectRef',
    tableName: 'chapter_projects_ref',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // The reference that maps a person to a chapter
  {
    name: 'ChapterPersonRef',
    tableName: 'chapter_people_ref',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // The reference that maps a chapter to a story
  {
    name: 'StoryChapterRef',
    tableName: 'story_chapters_ref',
    timestamps: { created: 'created_at', updated: 'updated_at' },
  },

  // A chapter
  {
    name: 'Chapter',
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

  // A story
  {
    name: 'Story',
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
        orderBy: 'story_order,created_at',
      },
    },
  },
];
