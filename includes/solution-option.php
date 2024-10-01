<?php
// includes/solution-option.php

// Create sub-menu
function solution_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Solutions',
    'Solutions',
    'manage_options',
    'solution-option',
    'solution_option_page'
  );
}
add_action('admin_menu', 'solution_option_menu');

function solution_option_graphql() {
  register_graphql_field('RootQuery', 'solution_options', [
    'type' => ['list_of' => 'SolutionOptionType'],
    'resolve' => function ($root, $args, $context, $info) {
      $solution_option = get_option('solution_options');
      return is_array($solution_option) ? $solution_option : array();
    },
  ]);

  register_graphql_object_type(
    'SolutionOptionType',
    [
      'description' => 'Custom solution type',
      'fields' => [
        'title' => [
          'type' => 'String',
          'description' => 'Solution Title',
          'resolve' => function ($solution_option) {
            return isset($solution_option['title']) ? stripslashes($solution_option['title']) : null;
          },
        ],
        'description' => [
          'type' => 'String',
          'description' => 'Solution Description',
          'resolve' => function ($solution_option) {
            return isset($solution_option['description']) ? stripslashes($solution_option['description']) : null;
          },
        ],
        'image_url' => [
          'type' => 'String',
          'description' => 'Solution Image URL',
          'resolve' => function ($solution_option) {
            return isset($solution_option['image_url']) ? esc_url($solution_option['image_url']) : null;
          },
        ],
      ],
    ]
  );
}
add_action('graphql_register_types', 'solution_option_graphql');

// Solution List page content
function solution_option_page() {
  // Process solution deletion
  if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['solution_id'])) {
    $solution_id = intval($_GET['solution_id']);
    solution_option_delete($solution_id);
  }

  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Process form submission
  if (isset($_POST['submit_solution_options'])) {
    // Check if it's an edit or add operation
    $edit_solution_id = isset($_POST['edit_solution_id']) ? intval($_POST['edit_solution_id']) : -1;

    // Sanitize input data
    $solution_title = sanitize_text_field($_POST['solution_title']);
    $solution_description = sanitize_textarea_field($_POST['solution_description']);
    $solution_image_url = sanitize_text_field($_POST['solution_image_url']);

    // Get existing solutions
    $solution_option = get_option('solution_options', array());

    // Add or update solution
    if ($edit_solution_id !== -1 && isset($solution_option[$edit_solution_id])) {
      // Editing an existing solution
      $solution_option[$edit_solution_id]['title'] = $solution_title;
      $solution_option[$edit_solution_id]['description'] = $solution_description;
      $solution_option[$edit_solution_id]['image_url'] = $solution_image_url;
    } else {
      // Adding a new solution
      $new_solution = array(
        'title' => $solution_title,
        'description' => $solution_description,
        'image_url' => $solution_image_url,
      );

      $solution_option[] = $new_solution;
    }

    // Update option
    update_option('solution_options', $solution_option);

    // Clear edit solution id after submission
    unset($_POST['edit_solution_id']);
  }

  // Display existing solutions in a table
  $solution_option = get_option('solution_options', array());
  $edit_solution_id = isset($_GET['action']) && $_GET['action'] === 'edit' ? intval($_GET['solution_id']) : -1;
?>
  <div class="wrap">
    <h1>Solution List</h1>
    <!-- Solution List form goes here -->
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <?php if ($edit_solution_id !== -1 && isset($solution_option[$edit_solution_id])) : ?>
        <input type="hidden" name="edit_solution_id" value="<?php echo $edit_solution_id; ?>">
      <?php endif; ?>

      <label for="solution-title">Title:</label>
      <input type="text" id="solution-title" name="solution_title" placeholder="Solution Title" value="<?php echo esc_attr($edit_solution_id !== -1 ? stripslashes($solution_option[$edit_solution_id]['title']) : ''); ?>" required>
      <br>

      <label for="solution-description">Description:</label>
      <textarea id="solution-description" rows="8" name="solution_description" placeholder="Solution Description" required><?php echo esc_textarea($edit_solution_id !== -1 ? stripslashes($solution_option[$edit_solution_id]['description']) : ''); ?></textarea>
      <br>

      <label for="image-upload">Image:</label>
      <div>
        <?php if ($edit_solution_id !== -1 && isset($solution_option[$edit_solution_id]['image_url'])) : ?>
          <img
            src="<?php echo esc_url($solution_option[$edit_solution_id]['image_url']); ?>"
            alt="Solution Image"
            class="image-preview"
            id="solution-image-preview"
          />
        <?php else : ?>
          <img
            alt="Solution Image"
            class="image-preview"
            id="solution-image-preview"
            style="display:none"
          />
        <?php endif; ?>
        <input type="text" name="solution_image_url" id="solution-image-url" value="<?php echo esc_attr($edit_solution_id !== -1 ? esc_url($solution_option[$edit_solution_id]['image_url']) : ''); ?>">
        <button type="button" class="button" onclick="solution_option_choose_media('solution-image-url', 'solution-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <input type="submit" name="submit_solution_options" class="image-upload-btn" value="<?php echo $edit_solution_id !== -1 ? 'Update Solution' : 'Add Solution'; ?>">
    </form>

    <h2>Existing Solutions</h2>
    <!-- Solution List table goes here -->
    <?php if (!empty($solution_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($solution_option as $solution_index => $solution_value) : ?>
            <tr>
              <td><?php echo $solution_index + 1; ?></td>
              <td><?php echo esc_html(stripslashes($solution_value['title'])); ?></td>
              <td><?php echo esc_html(stripslashes($solution_value['description'])); ?></td>
              <td>
                <?php if (isset($solution_value['image_url'])) : ?>
                  <img src="<?php echo esc_url($solution_value['image_url']); ?>" alt="Solution Image" style="max-width: 100px; max-height: 100px;">
                <?php endif; ?>
              </td>
              <td>
                <a href="?page=solution-option&action=edit&solution_id=<?php echo $solution_index; ?>" class="button button-primary">Edit</a>
                <a href="?page=solution-option&action=delete&solution_id=<?php echo $solution_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this solution?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No solutions added yet.</p>
    <?php endif; ?>
  </div>

  <script>
    function solution_option_choose_media(targetInputId, tagetPreviewId) {
      var mediaUploader;
      mediaUploader = wp.media({
        title: 'Select Image',
        library: { type: 'image' },
        button: { text: 'Select' },
        multiple: false
      });

      mediaUploader.on('select', function () {
        var attachment = mediaUploader.state().get('selection').first().toJSON();
        var hostUrl = window.location.origin;
        var imageUrl;
        if (attachment.url.startsWith('http')) {
          imageUrl = attachment.url;
        } else {
          imageUrl = hostUrl + attachment.url; // Construct full URL
        }
        document.getElementById(targetInputId).value = imageUrl;
        var imagePreview = document.getElementById(tagetPreviewId);
        if (imagePreview) {
          imagePreview.style = null;
          imagePreview.src = imageUrl;
        }
      });

      mediaUploader.open();
    }
  </script>
<?php
}

// Delete a solution
function solution_option_delete($solution_id) {
  // Get existing solutions
  $solution_option = get_option('solution_options', array());

  // Remove the solution at the specified index
  if (isset($solution_option[$solution_id])) {
    unset($solution_option[$solution_id]);

    // Update option
    update_option('solution_options', $solution_option);

    // Redirect back to the feature list page
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=solution-option'); ?>";
    </script>
    <?php
    exit;
  } else {
    // Feature not found, handle error or just redirect
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=solution-option'); ?>";
    </script>
    <?php
    exit;
  }
}
