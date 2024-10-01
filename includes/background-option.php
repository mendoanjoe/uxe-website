<?php
// includes/background-list.php

// Create sub-menu
function background_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Backgrounds',
    'Backgrounds',
    'manage_options',
    'background-option',
    'backgroun_option_page'
  );
}
add_action('admin_menu', 'background_option_menu');

// Function to update GraphQL schema with new backgrounds
function background_option_graphql() {
  register_graphql_field('RootQuery', 'background_options', [
    'type' => 'CustomCMSBackgroundsType',
    'resolve' => function ($root, $args, $context, $info) {
      // Get the CMS backgrounds from the option
      $background_option = get_option('background_options', array());

      // Return the backgrounds
      return $background_option;
    },
  ]);

  // Define GraphQL object type for the combined backgrounds
  register_graphql_object_type('CustomCMSBackgroundsType', [
    'description' => 'Custom CMS backgrounds type',
    'fields' => [
      'hero_home' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the home section',
        'resolve' => function ($background_option) {
          return isset($background_option['home']) ? $background_option['home'] : null;
        },
      ],
      'hero_contact' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the contact section',
        'resolve' => function ($background_option) {
          return isset($background_option['contact']) ? $background_option['contact'] : null;
        },
      ],
      'hero_product' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the product section',
        'resolve' => function ($background_option) {
          return isset($background_option['product']) ? $background_option['product'] : null;
        },
      ],
      'hero_about_us' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the about us section',
        'resolve' => function ($background_option) {
          return isset($background_option['about_us']) ? $background_option['about_us'] : null;
        },
      ],
      'hero_team' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the team section',
        'resolve' => function ($background_option) {
          return isset($background_option['team']) ? $background_option['team'] : null;
        },
      ],
      'hero_career' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the career section',
        'resolve' => function ($background_option) {
          return isset($background_option['career']) ? $background_option['career'] : null;
        },
      ],
      'hero_blog' => [
        'type' => 'CustomHeroAssetType',
        'description' => 'Hero assets for the blog section',
        'resolve' => function ($background_option) {
          return isset($background_option['blog']) ? $background_option['blog'] : null;
        },
      ],
    ],
  ]);

  // Define GraphQL object type for the hero asset
  register_graphql_object_type('CustomHeroAssetType', [
    'description' => 'Custom hero asset type',
    'fields' => [
      'type' => [
        'type' => 'String',
        'description' => 'Type of the hero asset (video/image)',
        'resolve' => function ($background_option_asset) {
          return isset($background_option_asset['type']) ? $background_option_asset['type'] : null;
        },
      ],
      'url' => [
        'type' => 'String',
        'description' => 'URL of the hero asset',
        'resolve' => function ($background_option_asset) {
          return isset($background_option_asset['url']) ? $background_option_asset['url'] : null;
        },
      ],
    ],
  ]);
};
add_action('graphql_register_types', 'background_option_graphql');

// Admin menu page content with dropdown selectors
function backgroun_option_page() {
  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Define background_sections
  $background_sections = array('home', 'contact', 'product', 'about_us', 'team', 'career', 'blog');

  // Retrieve options from the database
  $background_option = get_option('background_options', array());

  // Check if the form is submitted
  if (isset($_POST['submit_background_options'])) {
    // Initialize backgrounds array
    $background_option = array();

    // Loop through background_sections to populate hero assets dynamically
    foreach ($background_sections as $section) {
      // Check if the input for this section is set
      if (isset($_POST[$section . '_hero'])) {
        // Determine the type based on the file extension of the URL
        $url = sanitize_text_field($_POST[$section . '_hero']);
        $extension = strtolower(pathinfo($url, PATHINFO_EXTENSION));

        // Check if the extension corresponds to a video format
        $type = in_array($extension, ['mp4', 'webm', 'ogg']) ? 'video' : 'image';

        // Add this hero asset to the array
        $background_option[$section] = array(
          'type' => $type,
          'url' => $url
        );
      }
    }

    // Save backgrounds
    update_option('background_options', $background_option);
  }
  ?>
  <div class="wrap">
    <h1>Setting Background</h1>
    <form method="post" action="" class="form-wrap">
      <?php foreach ($background_sections as $section_value) : ?>
        <label for="<?php echo $section_value . '_hero'; ?>">
          <?php echo ucfirst(str_replace('_', ' ', $section_value)); ?> Hero:
        </label>

        <!-- Image preview -->
        <img
          id="<?php echo $section_value . '_hero_preview_img'; ?>"
          class="image-preview"
          src="<?php echo stripslashes(esc_attr($background_option[$section_value]['url'] ?? '')); ?>"
          alt="<?php echo ucfirst(str_replace('_', ' ', $section_value)); ?> Hero Image"
          <?php if (!isset($background_option[$section_value]) || $background_option[$section_value]["type"] == "video") : ?>style="display:none;"<?php endif; ?>
        />

        <!-- Video preview -->
        <video
          id="<?php echo $section_value . '_hero_preview_video'; ?>"
          class="image-preview"
          controls
          <?php if (!isset($background_option[$section_value]) || $background_option[$section_value]["type"] == "image") : ?>style="display:none;"<?php endif; ?>
        >
          <source
            src="<?php echo stripslashes(esc_attr($background_option[$section_value]['url'] ?? '')); ?>"
            type="video/mp4"
          >
          Your browser does not support the video tag.
        </video>

        <!-- URL preview -->
        <input
          type="text"
          id="<?php echo $section_value . '_hero'; ?>"
          name="<?php echo $section_value . '_hero'; ?>"
          value="<?php echo stripslashes(esc_attr($background_option[$section_value]['url'] ?? '')); ?>">

        <br/>
        <button
          type="button"
          class="button"
          onclick="background_choose_media('<?php echo $section_value . '_hero'; ?>')"
          style="width: 100%">
          Choose Image / Video
        </button>
        <br/>
        <br/>
      <?php endforeach; ?>
      <input type="submit" name="submit_background_options" class="image-upload-btn" value="Save Backgrounds">
    </form>

    <script>
      // JavaScript function to open media uploader
      function background_choose_media(targetInputId) {
        var mediaUploader;
        mediaUploader = wp.media({
          title: 'Select or Upload Hero Image or Video',
          library: { type: ['image', 'video'] },
          button: { text: 'Use this file' },
          multiple: false
        });

        mediaUploader.on('select', function () {
          var attachment = mediaUploader.state().get('selection').first().toJSON();
          var hostUrl = window.location.origin;
          var fileUrl;

          if (attachment.url.startsWith('http')) {
            fileUrl = attachment.url;
          } else {
            fileUrl = hostUrl + attachment.url; // Construct full URL
          }

          // Update the input field with the file URL
          document.getElementById(targetInputId).value = fileUrl;

          // Update the preview based on file type
          var imagePreview = document.getElementById(targetInputId + '_preview_img');
          var videoPreview = document.getElementById(targetInputId + '_preview_video');

          if (attachment.type === 'image') {
            // If the uploaded file is an image, show image preview and hide video preview
            imagePreview.src = fileUrl;
            imagePreview.style.display = 'block';
            videoPreview.style.display = 'none';
          } else if (attachment.type === 'video') {
            // If the uploaded file is a video, show video preview and hide image preview
            videoPreview.src = fileUrl;
            videoPreview.style.display = 'block';
            imagePreview.style.display = 'none';
          }
        });

        mediaUploader.open();
      }
    </script>
  </div>
<?php
}

