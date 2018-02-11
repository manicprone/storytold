# Storytold Planning

<br />

## Upcoming Features

* Implement "Scrollable with Menu" view style for ViewStoryPage (StoryScroller).

* Implement "The Big Picture" panel (full view tree).

* Add functionality to add/remove/order Chapters within a Story (e.g. sortable).

* Implement avatar component for bio access.

  - Displayed as a fixed, floating avatar at top of ViewStoryPage.

  - Show card on hover.

  - Display full size in viewport (with closable icon).

* Finalize StoryStepper / Chapter Tree components (also, decide if combine or separate them).

  - Handle color / styles.

  - Add logic to dynamically generate the hard widths of the nodes.
    (Or, perhaps we only need to depend upon the "draw" effect for larger sizes !?!?!?)

  - Add logic to fill the active viewport height.

<br />

## Backlog

* Move the EditorFeedback component (inside AdminEditor) outside of the controls section.

* Fix timezone translation / formatting with date pickers.

* Install/Access Roboto font and Material icons locally.

* Create a reusable component for the ListPanel.

* Implement the Bio panel component.

* Add story_settings db schema / joint config, for managing the display options
  of a Story (e.g. layout style, options, etc).

* Rename data schema to use singular table names throughout.

* Also, rename:
  - "users" => "user_account"
  - "user_info" => "user_ext_info"
  - "roles" => "user_role"

* Reconsider the name "persona". Perhaps => "identity" or just "profile" ???
  If "profile", then just refer to "user_ext_info" as "UserExtInfo" (as the model) ???

* Migrate over existing Vue component functional tests / continue testing all components.

* Inject <Model>EditorForm components into app-inject, so AdminEditor can access
  without need for explicitly including in the component itself.

<br />

## Example Stories to Showcase

* Professional/Projects (i.e. resume) - "A Software Developer Journey"

* Places Lived (with photos)

<br />

## Implementation Thoughts

* Component Structure / Naming

```
components/
  |
  |__ Admin/
  |     |
  |     |__ AdminContentList        | >  Used for generic item rendering
  |     |__ AdminContentListItem    |  
  |     |__ AdminEditor
  |     |__ AdminEditorFeedback
  |
  |__ App/
  |     |
  |     |__ AppFooter
  |     |__ AppHeader
  |     |__ AppNav                  | >  Can be rendered as drop-down menu
  |     |__ PageNav                 |    or nav bar
  |     |__ LanguagePicker
  |
  |__ Stories/
  |     |
  |     |__ StoryEditorForm
  |     |__ StoryScroller
  |     |__ StoryStepper
  |     |__ StoryStepperNode
  |
  |__ Chapters/
  |     |
  |     |__ ChapterCard
  |     |__ ChapterEditorForm
  |     |__ ChapterList
  |     |__ ChapterListItem
  |
  |__ Projects/
  |     |
  |     |__ ProjectEditorForm
  |     |__ ProjectList
  |     |__ ProjectListItem
  |
  |__ Bios/
  |     |
  |     |__ BioAvatar
  |     |__ BioCard
  |
  |__ Tags/
  |     |
  |     |__ TagEditorForm
  |     |__ TagList
  |     |__ TagListItem
  |
  |__ Users/
  |     |
  |     |__ ExternalUserEditorForm
  |     |__ LocalUserEditorForm
  |     |__ UserAvatar

```
