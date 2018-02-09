# Storytold Planning


## Upcoming Features

* Finalize StoryStepper / Chapter Tree components (also, decide if combine or separate them).

  - Handle color / styles.

  - Add logic to dynamically generate the hard widths of the nodes.
    (Or, perhaps we only need to depend upon the "draw" effect for larger sizes !?!?!?)

* Implement "The Big Picture" panel (full view tree).

* Add functionality to add/remove/order Chapters within a Story (e.g. sortable).

* Implement the first stab at the Bio panel.

<br />

## Backlog

* Install/Access Roboto font and Material icons locally.

* Create a reusable component for the ListPanel.

* Rename data schema to use singular table names throughout.

* Also, rename:
  - "users" => "user_account"
  - "user_info" => "user_ext_info"
  - "roles" => "user_role"

* Reconsider the name "persona". Perhaps => "identity" or just "profile" ???
  If "profile", then just refer to "user_ext_info" as "UserExtInfo" (as the model) ???

* Migrate over existing Vue component functional tests / continue testing all components.
