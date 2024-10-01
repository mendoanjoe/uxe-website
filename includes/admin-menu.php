<?php
// includes/admin-menu.php

// Add admin menu
function contact_option_menu() {
  add_menu_page(
    'CMS Setting',
    'CMS Setting',
    'manage_options',
    'cms-setting',
    'contact_option_page',
    'dashicons-admin-generic',
    30
  );
}
add_action('admin_menu', 'contact_option_menu');

// Function to update GraphQL schema with new settings
function contact_option_graphql() {
  register_graphql_field('RootQuery', 'contact_options', [
    'type' => 'ContactOptionType',
    'resolve' => function ($root, $args, $context, $info) {
      // Get the CMS settings from the option
      $contact_option = get_option('contact_options', array(
        'contact_form_7_shortcode' => ''
      ));

      $rendered_shortcode = '';  // or any other default value you prefer
      
      if (!empty($contact_option['contact_form_7_shortcode'])) {
        $rendered_shortcode = do_shortcode(stripslashes($contact_option['contact_form_7_shortcode']));
      }

      // Return the settings
      return $rendered_shortcode;
    },
  ]);

  // Define GraphQL object type for the combined settings
  register_graphql_object_type('ContactOptionType', [
    'description' => 'Custom CMS settings type',
    'fields' => [
      'html' => [
        'type' => 'String',
        'description' => 'Html Form',
        'resolve' => function ($rendered_shortcode) {
          return isset($rendered_shortcode) ? $rendered_shortcode : null;
        },
      ],
    ],
  ]);
}
add_action('graphql_register_types', 'contact_option_graphql');

// Admin menu page content with dropdown selectors
function contact_option_page() {
  // Retrieve existing settings or initialize with empty arrays
  $contact_option = get_option('contact_options', array(
    'contact_form_7_shortcode' => '',
  ));

  // If form is submitted, update settings
  if (isset($_POST['submit_contact_options'])) {
    // Initialize an empty array to store the updated settings
    $contact_option = array();
  
    // Process footer settings
    $contact_option['contact_form_7_shortcode'] = isset($_POST['contact_form_7_shortcode']) ? sanitize_textarea_field($_POST['contact_form_7_shortcode']) : '';
  
    update_option('contact_options', $contact_option);
  }
?>
  <div class="wrap">
    <h1>CMS Setting</h1>
    <!-- Setting options go here -->
    <form method="post" action="" class="form-wrap">
      <label for="contact_form_7_shortcode">Contact Form 7 Shortcode:</label>
      <input
        type="text"
        name="contact_form_7_shortcode"
        placeholder="Shortcode"
        value="<?php echo stripslashes(esc_attr($contact_option['contact_form_7_shortcode'] ?? '')); ?>"/>
      <br />
      <input type="submit" name="submit_contact_options" class="image-upload-btn" value="Save Settings">
    </form>

    <h2>Preview</h2>
    <?php
      if (isset($contact_option['contact_form_7_shortcode'])) {
        echo do_shortcode(stripslashes($contact_option['contact_form_7_shortcode']));
      } else {
        echo '<p>No Preview</p>';
      }
    ?>
  </div>
<?php
}
