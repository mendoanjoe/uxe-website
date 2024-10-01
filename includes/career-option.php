<?php
// includes/career-list.php

// Create sub-menu
function career_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Careers',
    'Careers',
    'manage_options',
    'career-option',
    'career_option_page'
  );
}
add_action('admin_menu', 'career_option_menu');

// Function to update GraphQL schema with new career2s
function career2_option_graphql() {
  register_graphql_field('RootQuery', 'career2_options', [
    'type' => 'CustomCMSCareer2',
    'resolve' => function ($root, $args, $context, $info) {
      // Get the CMS career2s from the option
      $career2_option = get_option('career2_options', array(
        'career_form_7_shortcode' => '',
        'career_hero' => ''
      ));

      // Return the career2s
      return $career2_option;
    },
  ]);

  // Define GraphQL object type for the combined career2s
  register_graphql_object_type('CustomCMSCareer2', [
    'description' => 'Custom CMS career2s type',
    'fields' => [
      'video' => [
        'type' => 'CustomVideoType2',
        'description' => 'Video for career option',
        'resolve' => function ($career2_option) {
          return isset($career2_option['career_hero']) ? $career2_option['career_hero'] : null;
        },
      ],
      'contact' => [
        'type' => 'FilledFormOptionType',
        'resolve' => function ($career2_option) {
          $rendered_shortcode = '';  // or any other default value you prefer
          if (!empty($career2_option['career_form_7_shortcode'])) {
            $rendered_shortcode = do_shortcode(stripslashes($career2_option['career_form_7_shortcode']));
          }

          // Return the settings
          return $rendered_shortcode;
        },
      ]
    ],
  ]);

  // Define GraphQL object type for the combined settings
  register_graphql_object_type('FilledFormOptionType', [
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

  // Define GraphQL object type for the hero asset
  register_graphql_object_type('CustomVideoType2', [
    'description' => 'Custom hero asset type',
    'fields' => [
      'type' => [
        'type' => 'String',
        'description' => 'Type of the hero asset (video/image)',
        'resolve' => function ($career2_option_asset) {
          return isset($career2_option_asset['type']) ? $career2_option_asset['type'] : null;
        },
      ],
      'url' => [
        'type' => 'String',
        'description' => 'URL of the hero asset',
        'resolve' => function ($career2_option_asset) {
          return isset($career2_option_asset['url']) ? $career2_option_asset['url'] : null;
        },
      ],
    ],
  ]);
};
add_action('graphql_register_types', 'career2_option_graphql');

// Admin menu page content with dropdown selectors
function career_option_page() {
  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Retrieve options from the database
  $career2_option = get_option('career2_options', array(
    'career_form_7_shortcode' => '',
    'career_hero' => ''
  ));

  // Check if the form is submitted
  if (isset($_POST['submit_career2_options'])) {
    // Check if the input for this section is set
    if (isset($_POST['career_hero'])) {
      // Determine the type based on the file extension of the URL
      $url = sanitize_text_field($_POST['career_hero']);
      $extension = strtolower(pathinfo($url, PATHINFO_EXTENSION));

      // Check if the extension corresponds to a video format
      $type = in_array($extension, ['mp4', 'webm', 'ogg']) ? 'video' : 'image';

      // Add this hero asset to the array
      $career2_option['career_hero'] = array(
        'type' => $type,
        'url' => $url
      );
    }

    if (isset($_POST['career_form_7_shortcode'])) {
      $career2_option['career_form_7_shortcode'] = sanitize_textarea_field($_POST['career_form_7_shortcode']);
    }

    // Save career2s
    update_option('career2_options', $career2_option);
  }
  ?>
  <div class="wrap">
    <h1>Career Setting</h1>
    <form method="post" action="" class="form-wrap">
      <label for="career_home">
        Video :
      </label>
      <!-- Video preview -->
      <video
        id="career_hero_preview_video"
        class="image-preview"
        controls
      >
        <source
          src="<?php echo stripslashes(esc_attr($career2_option['career_hero']['url'] ?? '')); ?>"
          type="video/mp4"
        >
        Your browser does not support the video tag.
      </video>

      <!-- URL preview -->
      <input
        type="text"
        id="career_home"
        name="career_home"
        value="<?php echo stripslashes(esc_attr($career2_option['career_hero']['url'] ?? '')); ?>"/>

      <br/>
      <button
        type="button"
        class="button"
        onclick="career2_choose_media('career_home')"
        style="width: 100%">
        Choose Video
      </button>
      <br/>
      <br/>
      <input
        type="text"
        name="career_form_7_shortcode"
        placeholder="Shortcode"
        value="<?php echo stripslashes(esc_attr($career2_option['career_form_7_shortcode'] ?? '')); ?>"/>
      <br />
      <input type="submit" name="submit_career2_options" class="image-upload-btn" value="Save Setting"/>
    </form>

    <h2>Preview</h2>
    <?php
      if (isset($career2_option['career_form_7_shortcode'])) {
        echo do_shortcode(stripslashes($career2_option['career_form_7_shortcode']));
      } else {
        echo '<p>No Preview</p>';
      }
    ?>

    <script>
      // JavaScript function to open media uploader
      function career2_choose_media(targetInputId) {
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