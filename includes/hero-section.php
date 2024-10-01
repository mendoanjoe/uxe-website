<?php
// includes/hero-section-option.php

// Create sub-menu for Hero Section
function hero_section_option_menu() {
  add_submenu_page(
    'cms-setting',          // Parent slug
    'Hero Section',         // Page title
    'Hero Section',         // Menu title
    'manage_options',       // Capability
    'hero-section-option',  // Menu slug
    'hero_section_option_page'  // Callback function
  );
}
add_action('admin_menu', 'hero_section_option_menu');

// Enqueue media uploader scripts
function hero_section_enqueue_media() {
  if (isset($_GET['page']) && $_GET['page'] === 'hero-section-option') {
    wp_enqueue_media(); // Enqueue the media library
  }
}
add_action('admin_enqueue_scripts', 'hero_section_enqueue_media');

// Register GraphQL for Hero Section
function hero_section_option_graphql() {
  register_graphql_field(
    'RootQuery',
    'hero_sections',
    [
      'type' => ['list_of' => 'CustomHeroSectionType'],
      'resolve' => function () {
        return get_option('hero_section_options', array());
      },
    ]
  );

  register_graphql_object_type(
    'CustomHeroSectionType',
    [
      'description' => 'Custom Hero Section type',
      'fields' => [
        'title' => [
          'type' => 'String',
          'description' => 'Hero Section Title',
        ],
        'image_url' => [
          'type' => 'String',
          'description' => 'Hero Section Image URL',
        ],
      ],
    ]
  );
}
add_action('graphql_register_types', 'hero_section_option_graphql');

// Render the Hero Section settings page
function hero_section_option_page() {
  // Save form data when submitted
  if (isset($_POST['submit_hero_section_options'])) {
    $hero_title = isset($_POST['hero_title']) ? sanitize_text_field($_POST['hero_title']) : '';
    $hero_image_url = isset($_POST['hero_image_url']) ? esc_url($_POST['hero_image_url']) : '';

    $hero_section_option = get_option('hero_section_options', array());

    $new_hero_section = array(
      'title' => $hero_title,
      'image_url' => $hero_image_url,
    );

    $hero_section_option[] = $new_hero_section;
    update_option('hero_section_options', $hero_section_option);
  }

  // Handle deletion of a hero section
  if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['hero_section_id'])) {
    $hero_section_id = intval($_GET['hero_section_id']);
    $hero_section_option = get_option('hero_section_options', array());
    if (isset($hero_section_option[$hero_section_id])) {
      unset($hero_section_option[$hero_section_id]);
      update_option('hero_section_options', $hero_section_option);
    }
  }

  // Retrieve saved options
  $hero_section_option = get_option('hero_section_options', array());
?>
  <div class="wrap">
    <h1>Hero Section Settings</h1>
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <label for="hero_title">Title:</label>
      <input type="text" name="hero_title" id="hero_title" value="" required>
      <br>

      <label for="hero_image_url">Image URL:</label>
      <div>
        <img alt="Hero Image" class="image-preview" id="hero-image-preview" style="display:none; max-width: 100px; max-height: 100px;">
        <input type="text" name="hero_image_url" id="hero_image_url" value="">
        <button type="button" class="button" onclick="client_choose_media('hero_image_url', 'hero-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <input type="submit" name="submit_hero_section_options" class="button button-primary" value="Add Hero Section">
    </form>

    <h2>Existing Hero Sections</h2>

    <?php if (!empty($hero_section_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($hero_section_option as $hero_section_index => $hero_section_value) : ?>
            <tr>
              <td><?php echo $hero_section_index + 1; ?></td>
              <td><?php echo esc_html($hero_section_value['title']); ?></td>
              <td><img src="<?php echo esc_url($hero_section_value['image_url']); ?>" alt="Hero Image" style="max-width: 100px; max-height: 100px;"></td>
              <td>
                <a href="?page=hero-section-option&action=delete&hero_section_id=<?php echo $hero_section_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this hero section?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No hero sections added yet.</p>
    <?php endif; ?>
  </div>

  <script>
    function client_choose_media(targetInputId, targetPreviewId) {
      var mediaUploader;
      mediaUploader = wp.media({
        title: 'Select Image',
        library: { type: 'image' },
        button: { text: 'Select' },
        multiple: false
      });

      mediaUploader.on('select', function () {
        var attachment = mediaUploader.state().get('selection').first().toJSON();
        var imageUrl = attachment.url.startsWith('http') ? attachment.url : window.location.origin + attachment.url;

        document.getElementById(targetInputId).value = imageUrl;
        var imagePreview = document.getElementById(targetPreviewId);
        imagePreview.style.display = 'block';
        imagePreview.src = imageUrl;
      });

      mediaUploader.open();
    }
  </script>
<?php
}
?>
