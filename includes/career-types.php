<?php
// includes/post-types.php

// Register custom post type for careers
function custom_career_post_type() {
  $labels = array(
      'name'               => 'Careers',
      'singular_name'      => 'Career',
      'menu_name'          => 'Careers',
      'add_new'            => 'Add New',
      'add_new_item'       => 'Add New Career',
      'edit_item'          => 'Edit Career',
      'new_item'           => 'New Career',
      'view_item'          => 'View Career',
      'search_items'       => 'Search Careers',
      'not_found'          => 'No careers found',
      'not_found_in_trash' => 'No careers found in trash',
  );

  $args = array(
      'labels'             => $labels,
      'public'             => true,
      'has_archive'        => true,
      'menu_position'      => 5,
      'supports'           => array('title', 'editor'),
      'rewrite'            => array('slug' => 'careers'),
      'taxonomies'         => array('career_category'), // Include the custom taxonomy
      'hierarchical'       => true,
      'show_in_graphql'    => true,
      'graphql_single_name' => 'career',
      'graphql_plural_name' => 'careers',
      'publicly_queryable'  => true,
  );

  register_post_type('career', $args);
}
add_action('init', 'custom_career_post_type');

// Add custom meta boxes for Location, Role, and Department
function add_career_custom_meta_boxes() {
  add_meta_box(
      'career_custom_fields',  // ID
      'Career Details',        // Title
      'career_custom_fields_callback', // Callback function
      'career',                // Post type
      'normal',                // Context
      'high'                   // Priority
  );
}
add_action('add_meta_boxes', 'add_career_custom_meta_boxes');

function career_custom_fields_callback($post) {
  // Retrieve current values
  $location = get_post_meta($post->ID, 'location', true);
  $role = get_post_meta($post->ID, 'role', true);
  $department = get_post_meta($post->ID, 'department', true);
  $description = get_post_meta($post->ID, 'description', true);
  $type = get_post_meta($post->ID, 'type', true);

  // Display form fields
  ?>
  <p style="display: flex;flex-direction: column;gap: 8px;">
      <label for="location">Location</label>
      <input type="text" name="location" id="location" value="<?php echo esc_attr($location); ?>" />
  </p>
  <p style="display: flex;flex-direction: column;gap: 8px;">
      <label for="role">Role</label>
      <input type="text" name="role" id="role" value="<?php echo esc_attr($role); ?>" />
  </p>
  <p style="display: flex;flex-direction: column;gap: 8px;">
      <label for="department">Department</label>
      <input type="text" name="department" id="department" value="<?php echo esc_attr($department); ?>" />
  </p>
  <p style="display: flex;flex-direction: column;gap: 8px;">
      <label for="description">Description</label>
      <input type="text" name="description" id="description" value="<?php echo esc_attr($description); ?>" />
  </p>
  <p style="display: flex;flex-direction: column;gap: 8px;">
      <label for="type">Type</label>
      <input type="text" name="type" id="type" value="<?php echo esc_attr($type); ?>" />
  </p>
  <?php
}

// Save custom fields when the post is saved
function save_career_custom_fields($post_id) {
  // Save Location field
  if (isset($_POST['location'])) {
      update_post_meta($post_id, 'location', sanitize_text_field($_POST['location']));
  }

  // Save Role field
  if (isset($_POST['role'])) {
      update_post_meta($post_id, 'role', sanitize_text_field($_POST['role']));
  }

  // Save Department field
  if (isset($_POST['department'])) {
      update_post_meta($post_id, 'department', sanitize_text_field($_POST['department']));
  }
  // Save Description field
  if (isset($_POST['description'])) {
      update_post_meta($post_id, 'description', sanitize_text_field($_POST['description']));
  }
  // Save Type field
  if (isset($_POST['type'])) {
      update_post_meta($post_id, 'type', sanitize_text_field($_POST['type']));
  }
}
add_action('save_post', 'save_career_custom_fields');

// Enable GraphQL for custom fields
add_filter('graphql_register_types', function() {
  register_graphql_field('Career', 'location', [
      'type' => 'String',
      'description' => 'The location of the career',
      'resolve' => function($post) {
          return get_post_meta($post->ID, 'location', true);
      }
  ]);

  register_graphql_field('Career', 'role', [
      'type' => 'String',
      'description' => 'The role of the career',
      'resolve' => function($post) {
          return get_post_meta($post->ID, 'role', true);
      }
  ]);

  register_graphql_field('Career', 'department', [
      'type' => 'String',
      'description' => 'The department of the career',
      'resolve' => function($post) {
          return get_post_meta($post->ID, 'department', true);
      }
  ]);
  register_graphql_field('Career', 'description', [
      'type' => 'String',
      'description' => 'The description of the career',
      'resolve' => function($post) {
          return get_post_meta($post->ID, 'description', true);
      }
  ]);
  register_graphql_field('Career', 'type', [
      'type' => 'String',
      'description' => 'The type of the career',
      'resolve' => function($post) {
          return get_post_meta($post->ID, 'type', true);
      }
  ]);
});

function custom_career_filter($args, $post_type) {
  // Change this to the post type you are adding support for
  if ('career' === $post_type) {
    $args['show_in_graphql']    = true;
    $args['graphql_single_name'] = 'career';
    $args['graphql_plural_name'] = 'careers';
    
  }
  return $args;
}
add_filter('register_post_type_args', 'custom_career_filter', 10, 2);
