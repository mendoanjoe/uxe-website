<?php
// includes/press-release-option.php

// Create sub-menu
function press_release_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Press Releases',
    'Press Releases',
    'manage_options',
    'press-release-option',
    'press_release_option_page'
  );
}
add_action('admin_menu', 'press_release_option_menu');

function press_release_option_graphql() {
  register_graphql_field(
    'RootQuery',
    'press_release_options',
    [
      'type' => ['list_of' => 'CustomPressReleaseType'],
      'args' => [
        'orderBy' => [
          'type' => 'String',
          'description' => 'Order by date (asc or desc)',
          'defaultValue' => 'desc'
        ]
      ],
      'resolve' => function ($root, $args) {
        $press_releases = get_option('press_release_options', array());

        // Sort press releases by date
        usort($press_releases, function($a, $b) use ($args) {
          $dateA = strtotime($a['created_at']);
          $dateB = strtotime($b['created_at']);
          return $args['orderBy'] === 'asc' ? $dateA - $dateB : $dateB - $dateA;
        });

        return $press_releases;
      },
    ]
  );

  register_graphql_object_type(
    'CustomPressReleaseType',
    [
      'description' => 'Custom press release type',
      'fields' => [
        'title' => [
          'type' => 'String',
          'description' => 'Press Release Title',
        ],
        'url' => [
          'type' => 'String',
          'description' => 'Press Release URL',
        ],
        'image_url' => [
          'type' => 'String',
          'description' => 'Image URL for Press Release',
        ],
        'description' => [
          'type' => 'String',
          'description' => 'Press Release Description',
        ],
        'created_at' => [
          'type' => 'String',
          'description' => 'Date when the press release was added',
        ],
        'added_by' => [
          'type' => 'String',
          'description' => 'User who added the press release',
        ],
      ],
    ]
  );
}
add_action('graphql_register_types', 'press_release_option_graphql');

// Press Release List page content
function press_release_option_page() {
  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Process form submission
  if (isset($_POST['submit_press_release_options'])) {
    $edit_press_release_id = isset($_POST['edit_press_release_id']) ? intval($_POST['edit_press_release_id']) : -1;

    $press_release_title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $press_release_url = isset($_POST['url']) ? esc_url($_POST['url']) : '';
    $press_release_image_url = isset($_POST['image_url']) ? esc_url($_POST['image_url']) : '';
    $press_release_description = isset($_POST['description']) ? sanitize_textarea_field($_POST['description']) : '';

    $press_release_option = get_option('press_release_options', array());

    if ($edit_press_release_id !== -1 && isset($press_release_option[$edit_press_release_id])) {
      $press_release_option[$edit_press_release_id]['title'] = $press_release_title;
      $press_release_option[$edit_press_release_id]['url'] = $press_release_url;
      $press_release_option[$edit_press_release_id]['image_url'] = $press_release_image_url;
      $press_release_option[$edit_press_release_id]['description'] = $press_release_description;
    } else {
      $new_press_release = array(
        'title' => $press_release_title,
        'url' => $press_release_url,
        'image_url' => $press_release_image_url,
        'description' => $press_release_description,
        'created_at' => current_time('mysql'),
        'added_by' => wp_get_current_user()->user_login, // Get the username of the person who added the press release
      );

      $press_release_option[] = $new_press_release;
    }

    update_option('press_release_options', $press_release_option);
    unset($_POST['edit_press_release_id']);
  }

  $press_release_option = get_option('press_release_options', array());
  $edit_press_release_id = isset($_GET['action']) && $_GET['action'] === 'edit' ? intval($_GET['press_release_id']) : -1;
?>
  <div class="wrap">
    <h1>Press Releases</h1>
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <?php if ($edit_press_release_id !== -1 && isset($press_release_option[$edit_press_release_id])) : ?>
        <input type="hidden" name="edit_press_release_id" value="<?php echo $edit_press_release_id; ?>">
      <?php endif; ?>

      <label for="title">Title:</label>
      <input type="text" name="title" id="title" value="<?php echo esc_attr($edit_press_release_id !== -1 ? $press_release_option[$edit_press_release_id]['title'] : ''); ?>" required>
      <br>

      <label for="url">URL:</label>
      <input type="url" name="url" id="url" value="<?php echo esc_attr($edit_press_release_id !== -1 ? $press_release_option[$edit_press_release_id]['url'] : ''); ?>" required>
      <br>

      <label for="image-url">Image URL:</label>
      <div>
        <?php if ($edit_press_release_id !== -1 && isset($press_release_option[$edit_press_release_id]['image_url'])) : ?>
          <img
            src="<?php echo esc_url($press_release_option[$edit_press_release_id]['image_url']); ?>"
            alt="Press Release Image"
            class="image-preview"
            id="press-release-image-preview"
          />
        <?php else : ?>
          <img
            alt="Press Release Image"
            class="image-preview"
            id="press-release-image-preview"
            style="display:none"
          />
        <?php endif; ?>
        <input type="text" name="image_url" id="press-release-image-url" value="<?php echo esc_attr($edit_press_release_id !== -1 ? esc_url($press_release_option[$edit_press_release_id]['image_url']) : ''); ?>">
        <button type="button" class="button" onclick="client_choose_media('press-release-image-url', 'press-release-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <label for="description">Description:</label>
      <textarea name="description" id="description" rows="4" required><?php echo esc_textarea($edit_press_release_id !== -1 ? $press_release_option[$edit_press_release_id]['description'] : ''); ?></textarea>
      <br>

      <input type="submit" name="submit_press_release_options" class="image-upload-btn" value="<?php echo $edit_press_release_id !== -1 ? 'Update Press Release' : 'Add Press Release'; ?>">
    </form>

    <h2>Existing Press Releases</h2>

    <?php if (!empty($press_release_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>URL</th>
            <th>Image</th>
            <th>Description</th>
            <th>Added By</th>
            <th>Created At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($press_release_option as $press_release_index => $press_release_value) : ?>
            <tr>
              <td><?php echo $press_release_index + 1; ?></td>
              <td><?php echo esc_html($press_release_value['title']); ?></td>
              <td><?php echo esc_url($press_release_value['url']); ?></td>
              <td>
                <img src="<?php echo esc_url($press_release_value['image_url']); ?>" alt="Press Release Image" style="max-width: 100px; max-height: 100px;">
              </td>
              <td><?php echo esc_html($press_release_value['description']); ?></td>
              <td><?php echo esc_html($press_release_value['added_by']); ?></td>
              <td><?php echo esc_html($press_release_value['created_at']); ?></td>
              <td>
                <a href="?page=press-release-option&action=edit&press_release_id=<?php echo $press_release_index; ?>" class="button button-primary">Edit</a>
                <a href="?page=press-release-option&action=delete&press_release_id=<?php echo $press_release_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this press release?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No press releases added yet.</p>
    <?php endif; ?>
  </div>

  <script>
    function client_choose_media(targetInputId, tagetPreviewId) {
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
          imageUrl = hostUrl + attachment.url;
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
?>