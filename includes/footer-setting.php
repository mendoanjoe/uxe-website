<?php
// includes/footer-option.php

// Create sub-menu
function footer_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Footer Setting',
    'Footer Setting',
    'manage_options',
    'footer-option',
    'footer_option_page'
  );
}
add_action('admin_menu', 'footer_option_menu');

function footer_option_graphql() {
  register_graphql_field('RootQuery', 'footer_options', [
    'type' => 'FooterOptionType',
    'resolve' => function ($root, $args, $context, $info) {
      // Get the CMS settings from the option
      $footer_option = get_option('footer_options', array());

      // Return the settings
      return $footer_option;
    },
  ]);

  // Define GraphQL object type for the combined settings
  register_graphql_object_type('FooterOptionType', [
    'description' => 'Custom CMS settings type',
    'fields' => [
      'address' => [
        'type' => 'String',
        'description' => 'Address settings',
        'resolve' => function ($footer_option) {
          return isset($footer_option['address']) ? $footer_option['address'] : null;
        },
      ],
      'explore_menu' => [
        'type' => ['list_of' => 'FooterOptionMenuType'],
        'description' => 'Explore menu setting',
        'resolve' => function ($footer_option) {
          return isset($footer_option['explore_menu']) ? $footer_option['explore_menu'] : [];
        },
      ],
      'contact_menu' => [
        'type' => ['list_of' => 'FooterOptionMenuType'],
        'description' => 'Contact menu setting',
        'resolve' => function ($footer_option) {
          return isset($footer_option['contact_menu']) ? $footer_option['contact_menu'] : [];
        },
      ],
      'follow_us_menu' => [
        'type' => ['list_of' => 'FooterOptionMenuType'],
        'description' => 'Follow Us Menu setting',
        'resolve' => function ($footer_option) {
          return isset($footer_option['follow_us_menu']) ? $footer_option['follow_us_menu'] : [];
        },
      ],
    ],
  ]);

  register_graphql_object_type('FooterOptionMenuType', [
    'description' => 'Custom contact type',
    'fields' => [
      'name' => [
        'type' => 'String',
        'description' => 'Title',
        'resolve' => function ($footer_option_menu) {
          return isset($footer_option_menu['name']) ? esc_html($footer_option_menu['name']) : null;
        },
      ],
      'url' => [
        'type' => 'String',
        'description' => 'URL',
        'resolve' => function ($footer_option_menu) {
          return isset($footer_option_menu['url']) ? esc_html($footer_option_menu['url']) : null;
        },
      ],
    ],
  ]);
}
add_action('graphql_register_types', 'footer_option_graphql');

// Career List page content
function footer_option_page() {
  // Retrieve existing settings or initialize with empty arrays
  $footer_option = get_option('footer_options', array(
    'address' => '',
    'explore_menu' => array(),
    'contact_menu' => array(),
    'follow_us_menu' => array()
  ));
  
  // If form is submitted, update settings
  if (isset($_POST['submit_footer_options'])) {
    // Initialize an empty array to store the updated settings
    $footer_option = array();

    // Process footer settings
    $footer_option['address'] = isset($_POST['address']) ? sanitize_textarea_field($_POST['address']) : '';

    // Process Explore Menu settings
    $footer_option_explore_menu = array();
    if (isset($_POST['hidden_explore_name']) && isset($_POST['hidden_explore_url'])) {
      // Retrieve the names and URLs from the hidden inputs
      $footer_option_explore_menu_name = explode(',', sanitize_text_field($_POST['hidden_explore_name']));
      $footer_option_explore_menu_url = explode(',', wp_kses_post($_POST['hidden_explore_url']));

      // Combine names and URLs into an array of objects
      foreach ($footer_option_explore_menu_name as $menu_name_index => $menu_name_value) {
        // Check if both name and URL are not empty
        if (!empty($menu_name_value) && isset($footer_option_explore_menu_url[$menu_name_index]) && !empty($footer_option_explore_menu_url[$menu_name_index])) {
          $footer_option_explore_menu[] = array(
            'name' => $menu_name_value,
            'url' => $footer_option_explore_menu_url[$menu_name_index]
          );
        }
      }
    }
    $footer_option['explore_menu'] = $footer_option_explore_menu;

    // Process Contact Menu settings
    $footer_option_contact_menu = array();
    if (isset($_POST['hidden_contact_name']) && isset($_POST['hidden_contact_url'])) {
      // Retrieve the names and URLs from the hidden inputs
      $footer_option_contact_name = explode(',', sanitize_text_field($_POST['hidden_contact_name']));
      $footer_option_contact_url = explode(',', wp_kses_post($_POST['hidden_contact_url']));

      // Combine names and URLs into an array of objects
      foreach ($footer_option_contact_name as $contact_name_index => $contact_name_value) {
        // Check if both name and URL are not empty
        if (!empty($contact_name_value) && isset($footer_option_contact_url[$contact_name_index]) && !empty($footer_option_contact_url[$contact_name_index])) {
          $footer_option_contact_menu[] = array(
            'name' => $contact_name_value,
            'url' => $footer_option_contact_url[$contact_name_index]
          );
        }
      }
    }
    $footer_option['contact_menu'] = $footer_option_contact_menu;

    // Process Follow Us Menu settings
    $footer_option_follow_us_menu = array();
    if (isset($_POST['hidden_follow_us_name']) && isset($_POST['hidden_follow_us_url'])) {
      // Retrieve the names and URLs from the hidden inputs
      $footer_option_follow_us_name = explode(',', sanitize_text_field($_POST['hidden_follow_us_name']));
      $follow_us_urls = explode(',', wp_kses_post($_POST['hidden_follow_us_url']));

      // Combine names and URLs into an array of objects
      foreach ($footer_option_follow_us_name as $follow_us_name_index => $follow_us_name_value) {
        // Check if both name and URL are not empty
        if (!empty($follow_us_name_value) && isset($follow_us_urls[$follow_us_name_index]) && !empty($follow_us_urls[$follow_us_name_index])) {
          $footer_option_follow_us_menu[] = array(
            'name' => $follow_us_name_value,
            'url' => $follow_us_urls[$follow_us_name_index]
          );
        }
      }
    }
    $footer_option['follow_us_menu'] = $footer_option_follow_us_menu;

    // Save updated settings
    update_option('footer_options', $footer_option);
  }
?>

<div class="wrap">
  <h1>CMS Setting</h1>
  <form method="post" action="" class="form-wrap">
    <h2>Footer</h2>
    <!-- Setting options go here -->
    <label for="address">Address:</label>
    <textarea id="address" rows="8" name="address" placeholder="Address Description" required><?php echo isset($footer_option['address']) ? esc_textarea($footer_option['address']) : ''; ?></textarea>

    <!-- Explore Menu -->
    <label>Explore Menu:</label>
    <input type="text" name="explore_name[]" placeholder="Explore Title" value="">
    <input type="text" name="explore_url[]" placeholder="Explore Url" value="">
    <div class="button" style="width:100%" onclick="footer_add_to_table('explore_name', 'explore_url', 'explore_table', 'hidden_explore_name', 'hidden_explore_url')">Add Explore</div>

    <br />
    <br />

    <table id="explore_table" class="wp-list-table widefat fixed striped" data-hidden-input="hidden_explore">
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($footer_option['explore_menu'] as $item) : ?>
        <tr>
          <td><?php echo esc_html($item['name']); ?></td>
          <td><?php echo esc_html($item['url']); ?></td>
          <td>
            <div class="button button-primary" onclick="footer_edit_row(this)">Edit</div>
            <div class="button button-secondary" onclick="footer_delete_row(this)">Delete</div>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>

    <input type="hidden" name="hidden_explore_name" id="hidden_explore_name" value="<?php echo implode(',', array_column($footer_option['explore_menu'], 'name')); ?>">
    <input type="hidden" name="hidden_explore_url" id="hidden_explore_url" value="<?php echo implode(',', array_column($footer_option['explore_menu'], 'url')); ?>">

    <br />
    <br />

    <!-- Contact Menu -->
    <label>Contact Menu:</label>
    <input type="text" name="contact_name[]" placeholder="Contact Title" value="">
    <input type="text" name="contact_url[]" placeholder="Contact Url" value="">
    <div class="button" style="width:100%" onclick="footer_add_to_table('contact_name', 'contact_url', 'contact_table', 'hidden_contact_name', 'hidden_contact_url')">Add Contact</div>

    <br />
    <br />

    <table id="contact_table" class="wp-list-table widefat fixed striped" data-hidden-input="hidden_contact">
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($footer_option['contact_menu'] as $item) : ?>
        <tr>
          <td><?php echo esc_html($item['name']); ?></td>
          <td><?php echo esc_html($item['url']); ?></td>
          <td>
            <div class="button button-primary" onclick="footer_edit_row(this)">Edit</div>
            <div class="button button-secondary" onclick="footer_delete_row(this)">Delete</div>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>

    <input type="hidden" name="hidden_contact_name" id="hidden_contact_name" value="<?php echo implode(',', array_column($footer_option['contact_menu'], 'name')); ?>">
    <input type="hidden" name="hidden_contact_url" id="hidden_contact_url" value="<?php echo implode(',', array_column($footer_option['contact_menu'], 'url')); ?>">

    <br />
    <br />

    <!-- Follow Us Menu -->
    <label>Follow Us Menu:</label>
    <input type="text" name="follow_us_name[]" placeholder="Follow Us Title" value="">
    <input type="text" name="follow_us_url[]" placeholder="Follow Us Url" value="">
    <div class="button" style="width:100%" onclick="footer_add_to_table('follow_us_name', 'follow_us_url', 'follow_us_table', 'hidden_follow_us_name', 'hidden_follow_us_url')">Add Follow Us</div>

    <br />
    <br />

    <table id="follow_us_table" class="wp-list-table widefat fixed striped" data-hidden-input="hidden_follow_us">
      <thead>
        <tr>
          <th>Title</th>
          <th>URL</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
      <?php foreach ($footer_option['follow_us_menu'] as $item) : ?>
        <tr>
          <td><?php echo esc_html($item['name']); ?></td>
          <td><?php echo esc_html($item['url']); ?></td>
          <td>
            <div class="button button-primary" onclick="footer_edit_row(this)">Edit</div>
            <div class="button button-secondary" onclick="footer_delete_row(this)">Delete</div>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
    </table>

    <input type="hidden" name="hidden_follow_us_name" id="hidden_follow_us_name" value="<?php echo implode(',', array_column($footer_option['follow_us_menu'], 'name')); ?>">
    <input type="hidden" name="hidden_follow_us_url" id="hidden_follow_us_url" value="<?php echo implode(',', array_column($footer_option['follow_us_menu'], 'url')); ?>">

    <br />
    <br />
    <input type="submit" name="submit_footer_options" class="image-upload-btn" value="Save Settings">
  </form>
  
  <script>
    function footer_add_to_table(nameId, urlId, tableId, hiddenNameId, hiddenUrlId) {
      var nameInputs = document.getElementsByName(nameId + "[]");
      var urlInputs = document.getElementsByName(urlId + "[]");
      var table = document.getElementById(tableId);
      var tbody = table.getElementsByTagName("tbody")[0];
      
      for (var i = 0; i < nameInputs.length; i++) {
        var name = nameInputs[i].value.trim();
        var url = urlInputs[i].value.trim();
        
        if (name && url) {var newRow = tbody.insertRow();
          var cell1 = newRow.insertCell();
          var cell2 = newRow.insertCell();
          var cell3 = newRow.insertCell();

          cell1.textContent = name;
          cell2.textContent = url;
          cell3.innerHTML = '<div class="button button-primary" onclick="footer_edit_row(this)">Edit</div> <div class="button button-secondary" onclick="footer_delete_row(this)">Delete</div>';

          // Update hidden inputs
          var hiddenNameInput = document.getElementById(hiddenNameId);
          var hiddenUrlInput = document.getElementById(hiddenUrlId);
          hiddenNameInput.value += name + ',';
          hiddenUrlInput.value += url + ',';
        }
      }
    }

    function footer_edit_row(button) {
      var row = button.parentNode.parentNode;
      var cells = row.getElementsByTagName("td");
      var name = cells[0].textContent;
      var url = cells[1].textContent;

      var newName = prompt("Enter new name:", name);
      var newUrl = prompt("Enter new URL:", url);

      if (newName !== null && newUrl !== null) {
        cells[0].textContent = newName;
        cells[1].textContent = newUrl;
        
        // Update hidden inputs
        footer_update_hidden_input(row.parentNode.parentNode);
      }
    }

    function footer_delete_row(button) {
      var tableBody = button.parentNode.parentNode.parentNode.parentNode
      var drow = button.parentNode.parentNode;
      drow.parentNode.removeChild(drow);
          
      // Update hidden inputs
      footer_update_hidden_input(tableBody);
    }

    function footer_update_hidden_input(table) {
      var hiddenNameInput = document.getElementById(table.getAttribute("data-hidden-input") + '_name');
      var hiddenUrlInput = document.getElementById(table.getAttribute("data-hidden-input") + '_url');
      hiddenNameInput.value = '';
      hiddenUrlInput.value = '';

      var rows = table.querySelectorAll('tbody tr');
      for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var name = cells[0].textContent.trim();
        var url = cells[1].textContent.trim();
        if (name && url) {
          hiddenNameInput.value += name + ',';
          hiddenUrlInput.value += url + ',';
        }
      }
    }
  </script>
</div>
<?php
}
