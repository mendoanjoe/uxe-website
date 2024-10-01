<?php
// includes/feature-option.php

// Create sub-menu
function feature_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Features',
    'Features',
    'manage_options',
    'feature-option',
    'feature_option_page'
  );
}
add_action('admin_menu', 'feature_option_menu');

function feature_option_graphql() {
  register_graphql_field('RootQuery', 'feature_options', [
    'type' => ['list_of' => 'FeatureOptionType'],
    'resolve' => function () {
      $feature_option = get_option('feature_options');
      return is_array($feature_option) ? $feature_option : array();
    },
  ]);

  register_graphql_object_type('FeatureOptionType', [
    'description' => 'Custom feature type',
    'fields' => [
      'icon' => [
        'type' => 'String',
        'description' => 'Feature Icon',
        'resolve' => function ($feature_option) {
          return isset($feature_option['icon']) ? stripslashes(base64_decode($feature_option['icon'])) : null;
        },
      ],
      'title' => [
        'type' => 'String',
        'description' => 'Feature Title',
        'resolve' => function ($feature_option) {
          return isset($feature_option['title']) ? stripslashes($feature_option['title']) : null;
        },
      ],
      'description' => [
        'type' => 'String',
        'description' => 'Feature Description',
        'resolve' => function ($feature_option) {
          return isset($feature_option['description']) ? stripslashes($feature_option['description']) : null;
        },
      ],
    ],
  ]);
}
add_action('graphql_register_types', 'feature_option_graphql');

// Feature List page content
function feature_option_page() {
  // Process feature deletion
  if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['feature_id'])) {
    $feature_id = intval($_GET['feature_id']);
    feature_option_delete($feature_id);
  }

  // Process form submission
  if (isset($_POST['submit_feature_options'])) {
    // Check if it's an edit or add operation
    $edit_feature_id = isset($_POST['edit_feature_id']) ? intval($_POST['edit_feature_id']) : -1;

    // Sanitize input data
    $feature_icon = isset($_POST['feature_icon']) ? base64_encode($_POST['feature_icon']) : ''; // Treat SVG code as a string
    $feature_title = isset($_POST['feature_title']) ? sanitize_text_field($_POST['feature_title']) : '';
    $feature_description = isset($_POST['feature_description']) ? sanitize_textarea_field($_POST['feature_description']) : '';

    // Get existing features
    $feature_option = get_option('feature_options', array());

    // Add or update feature
    if ($edit_feature_id !== -1 && isset($feature_option[$edit_feature_id])) {
      // Editing an existing feature
      $feature_option[$edit_feature_id]['icon'] = $feature_icon;
      $feature_option[$edit_feature_id]['title'] = $feature_title;
      $feature_option[$edit_feature_id]['description'] = $feature_description;
    } else {
      // Adding a new feature
      $new_feature = array(
        'icon' => $feature_icon,
        'title' => $feature_title,
        'description' => $feature_description,
      );

      $feature_option[] = $new_feature;
    }

    // Update option
    update_option('feature_options', $feature_option);

    // Clear edit feature id after submission
    unset($_POST['edit_feature_id']);
  }

  // Display existing features in a table
  $feature_option = get_option('feature_options', array());
  $edit_feature_id = isset($_GET['action']) && $_GET['action'] === 'edit' ? intval($_GET['feature_id']) : -1;
?>
  <div class="wrap">
    <h1>Feature List</h1>
    <!-- Feature List form goes here -->
    <form method="post" action="" class="form-wrap">
      <?php if ($edit_feature_id !== -1 && isset($feature_option[$edit_feature_id])) : ?>
        <input type="hidden" name="edit_feature_id" value="<?php echo $edit_feature_id; ?>">
      <?php endif; ?>

      <label for="feature-title">Title:</label>
      <input type="text" id="feature-title" name="feature_title" placeholder="Feature Title" value="<?php echo esc_attr($edit_feature_id !== -1 ? stripslashes($feature_option[$edit_feature_id]['title']) : ''); ?>" required>
      <br>

      <label for="feature-description">Description:</label>
      <textarea id="feature-description" rows="8" name="feature_description" placeholder="Feature Description" required><?php echo esc_textarea($edit_feature_id !== -1 ? stripslashes($feature_option[$edit_feature_id]['description']) : ''); ?></textarea>
      <br>

      <label for="feature-icon">Icon (SVG):</label>
      <textarea id="feature-icon" rows="8" name="feature_icon" placeholder="Feature Icon (SVG)" required><?php echo esc_textarea($edit_feature_id !== -1 ? stripslashes(base64_decode($feature_option[$edit_feature_id]['icon'])) : ''); ?></textarea>
      <br>

      <input type="submit" name="submit_feature_options" class="image-upload-btn" value="<?php echo $edit_feature_id !== -1 ? 'Update Feature' : 'Add Feature'; ?>">
    </form>

    <h2>Existing Features</h2>
    <!-- Feature List table goes here -->
    <?php if (!empty($feature_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Icon</th>
            <th>Title</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($feature_option as $feature_index => $feature_value) : ?>
            <tr>
              <td><?php echo $feature_index + 1; ?></td>
              <td>
                <div class="svg-preview">
                  <?php echo isset($feature_value['icon']) ? stripslashes(base64_decode($feature_value['icon'])) : ''; ?>
                </div>
              </td>
              <td><?php echo isset($feature_value['title']) ? esc_html(stripslashes($feature_value['title'])) : ''; ?></td>
              <td><?php echo isset($feature_value['description']) ? esc_html(stripslashes($feature_value['description'])) : ''; ?></td>
              <td>
                <a href="?page=feature-option&action=edit&feature_id=<?php echo $feature_index; ?>" class="button button-primary">Edit</a>
                <a href="?page=feature-option&action=delete&feature_id=<?php echo $feature_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this feature?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No features added yet.</p>
    <?php endif; ?>
  </div>
<?php
}

// Delete a feature
function feature_option_delete($feature_id) {
  // Get existing features
  $feature_option = get_option('feature_options', array());

  // Remove the feature at the specified index
  if (isset($feature_option[$feature_id])) {
    unset($feature_option[$feature_id]);

    // Update option
    update_option('feature_options', $feature_option);

    // Redirect back to the feature list page
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=feature-option'); ?>";
    </script>
    <?php
    exit;
  } else {
    // Feature not found, handle error or just redirect
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=feature-option'); ?>";
    </script>
    <?php
    exit;
  }
}
?>
