<?php
// includes/vision-mission-option.php

// Create sub-menu
function vision_and_mission_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Vision & Mission',
    'Vision & Mission',
    'manage_options',
    'vision-mission-option',
    'vision_and_mission_option_page'
  );
}
add_action('admin_menu', 'vision_and_mission_option_menu');

// Vision & Mission page content
function vision_and_mission_option_page() {
  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Process form submission
  if (isset($_POST['submit_vision_and_mission_options'])) {
    // Sanitize input data for vision
    $vision_title = sanitize_text_field($_POST['vision_title']);
    $vision_description = sanitize_textarea_field($_POST['vision_description']);
    $vision_image_url = sanitize_text_field($_POST['vision_image_url']);

    // Sanitize input data for mission
    $mission_title = sanitize_text_field($_POST['mission_title']);
    $mission_description = sanitize_textarea_field($_POST['mission_description']);
    $mission_image_url = sanitize_text_field($_POST['mission_image_url']);

    // Combine vision and mission data into a single option
    $vision_and_mission_option = array(
      'vision' => array(
        'title' => $vision_title,
        'description' => $vision_description,
        'image_url' => $vision_image_url,
      ),
      'mission' => array(
        'title' => $mission_title,
        'description' => $mission_description,
        'image_url' => $mission_image_url,
      ),
    );

    // Save combined data to options
    update_option('vision_and_mission_options', $vision_and_mission_option);
  }

  // Get existing data from options
  $vision_and_mission_option = get_option('vision_and_mission_options', array());
  $vision_title = isset($vision_and_mission_option['vision']['title']) ? $vision_and_mission_option['vision']['title'] : '';
  $vision_description = isset($vision_and_mission_option['vision']['description']) ? $vision_and_mission_option['vision']['description'] : '';
  $vision_image_url = isset($vision_and_mission_option['vision']['image_url']) ? $vision_and_mission_option['vision']['image_url'] : '';
  $mission_title = isset($vision_and_mission_option['mission']['title']) ? $vision_and_mission_option['mission']['title'] : '';
  $mission_description = isset($vision_and_mission_option['mission']['description']) ? $vision_and_mission_option['mission']['description'] : '';
  $mission_image_url = isset($vision_and_mission_option['mission']['image_url']) ? $vision_and_mission_option['mission']['image_url'] : '';
?>
  <div class="wrap">
    <h1>Vision & Mission</h1>
    <!-- Vision & Mission form goes here -->
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <h2>Vision</h2>
      <label for="vision-title">Title:</label>
      <input type="text" id="vision-title" name="vision_title" placeholder="Vision Title" value="<?php echo esc_attr(stripslashes($vision_title)); ?>" required>
      <br>

      <label for="vision-description">Description:</label>
      <textarea id="vision-description" rows="8" name="vision_description" placeholder="Vision Description" required><?php echo esc_textarea(stripslashes($vision_description)); ?></textarea>
      <br>

      <label for="vision-image-upload">Image:</label>
      <div>
        <?php if ($vision_image_url) : ?>
          <img
            src="<?php echo esc_url($vision_image_url); ?>"
            alt="Vision Image"
            class="image-preview"
            id="vision-image-preview"
          />
        <?php else : ?>
          <img
            alt="Vision Image"
            class="image-preview"
            id="vision-image-preview"
            style="display:none;"
          />
        <?php endif; ?>
        <input type="text" name="vision_image_url" id="vision-image-url" value="<?php echo esc_url($vision_image_url); ?>">
        <button type="button" class="button" onclick="vision_and_mission_choose_media('vision-image-url', 'vision-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <h2>Mission</h2>
      <label for="mission-title">Title:</label>
      <input type="text" id="mission-title" name="mission_title" placeholder="Mission Title" value="<?php echo esc_attr(stripslashes($mission_title)); ?>" required>
      <br>

      <label for="mission-description">Description:</label>
      <textarea id="mission-description" rows="8" name="mission_description" placeholder="Mission Description" required><?php echo esc_textarea(stripslashes($mission_description)); ?></textarea>
      <br>

      <label for="mission-image-upload">Image:</label>
      <div>
        <?php if ($mission_image_url) : ?>
          <img
            src="<?php echo esc_url($mission_image_url); ?>"
            alt="Mission Image"
            class="image-preview"
            id="mission-image-preview"
          />
        <?php else : ?>
          <img
            alt="Mission Image"
            class="image-preview"
            id="mission-image-preview"
            style="display:none;"
          />
        <?php endif; ?>
        <input type="text" name="mission_image_url" id="mission-image-url" value="<?php echo esc_url($mission_image_url); ?>">
        <button type="button" class="button" onclick="vision_and_mission_choose_media('mission-image-url', 'mission-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <input type="submit" name="submit_vision_and_mission_options" class="image-upload-btn" value="Save">
    </form>

    <script>
      function vision_and_mission_choose_media(targetInputId, tagetPreviewId) {
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
  </div>
<?php
}

// Register GraphQL fields for vision & mission
function vision_and_mission_graphql() {
  register_graphql_field(
    'RootQuery',
    'vision_and_mission_options',
    [
      'type' => 'VisionAndMissionOptionType',
      'resolve' => function () {
        return get_option('vision_and_mission_options', array());
      }
    ]
  );

  register_graphql_object_type(
    'VisionAndMissionOptionType',
    [
      'description' => 'Custom vision & mission type',
      'fields' => [
        'vision' => [
          'type' => 'VisionOptionType',
          'resolve' => function ($vision_and_mission_option) {
            return $vision_and_mission_option['vision'];
          }
        ],
        'mission' => [
          'type' => 'MissionOptionType',
          'resolve' => function ($vision_and_mission_option) {
            return $vision_and_mission_option['mission'];
          }
        ]
      ]
    ]
  );

  register_graphql_object_type(
    'VisionOptionType',
    [
      'description' => 'Custom vision type',
      'fields' => [
        'title' => [
          'type' => 'String',
          'resolve' => function ($vision) {
            return isset($vision['title']) ? stripslashes($vision['title']) : null;
          }
        ],
        'description' => [
          'type' => 'String',
          'resolve' => function ($vision) {
            return isset($vision['description']) ? stripslashes($vision['description']) : null;
          }
        ],
        'image_url' => [
          'type' => 'String',
          'resolve' => function ($vision) {
            return isset($vision['image_url']) ? esc_url($vision['image_url']) : null;
          }
        ]
      ]
    ]
  );

  register_graphql_object_type(
    'MissionOptionType',
    [
      'description' => 'Custom mission type',
      'fields' => [
        'title' => [
          'type' => 'String',
          'resolve' => function ($mission) {
            return isset($mission['title']) ? stripslashes($mission['title']) : null;
          }
        ],
        'description' => [
          'type' => 'String',
          'resolve' => function ($mission) {
            return isset($mission['description']) ? stripslashes($mission['description']) : null;
          }
        ],
        'image_url' => [
          'type' => 'String',
          'resolve' => function ($mission) {
            return isset($mission['image_url']) ? esc_url($mission['image_url']) : null;
          }
        ]
      ]
    ]
  );
}
add_action('graphql_register_types', 'vision_and_mission_graphql');
