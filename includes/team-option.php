<?php
// includes/team-option.php

// Create sub-menu
function team_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Teams',
    'Teams',
    'manage_options',
    'team-option',
    'team_option_page'
  );
}
add_action('admin_menu', 'team_option_menu');

function team_option_graphql() {
  register_graphql_field(
    'RootQuery',
    'team_options',
    [
      'type' => ['list_of' => 'TeamOptionType'], // Define TeamOptionType below
      'resolve' => function () {
        return get_option('team_options', array()); // Replace 'team_options' with the name of your option
      },
    ]
  );

  register_graphql_object_type(
    'TeamOptionType',
    [
      'description' => 'Custom team member type',
      'fields' => [
        'name' => [
          'type' => 'String',
          'description' => 'Team Member Name',
          'resolve' => function ($team_option) {
            return isset($team_option['name']) ? stripslashes($team_option['name']) : null;
          },
        ],
        'role' => [
          'type' => 'String',
          'description' => 'Team Member Role',
          'resolve' => function ($team_option) {
            return isset($team_option['role']) ? stripslashes($team_option['role']) : null;
          },
        ],
        'photo_url' => [
          'type' => 'String',
          'description' => 'Team Member Photo URL',
          'resolve' => function ($team_option) {
            return isset($team_option['photo_url']) ? esc_url($team_option['photo_url']) : null;
          },
        ],
        'social_media' => [
          'type' => 'TeamOptionSocialMediaType',
          'description' => 'Social Media Links',
          'resolve' => function ($team_option) {
            return isset($team_option['social_media']) ? $team_option['social_media'] : null;
          },
        ],
      ],
    ]
  );

  register_graphql_object_type(
    'TeamOptionSocialMediaType',
    [
      'description' => 'Custom social media type',
      'fields' => [
        'linkedin' => [
          'type' => 'String',
          'description' => 'LinkedIn URL',
          'resolve' => function ($team_option_social_media) {
            return isset($team_option_social_media['linkedin']) ? esc_url($team_option_social_media['linkedin']) : null;
          },
        ],
        'twitter' => [
          'type' => 'String',
          'description' => 'Twitter URL',
          'resolve' => function ($team_option_social_media) {
            return isset($team_option_social_media['twitter']) ? esc_url($team_option_social_media['twitter']) : null;
          },
        ],
        // Add other social media fields here
      ],
    ]
  );
}
add_action('graphql_register_types', 'team_option_graphql');

// Team List page content
function team_option_page() {
  // Process team member deletion
  if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['team_id'])) {
    $team_id = intval($_GET['team_id']);
    team_option_delete($team_id);
  }

  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Process form submission
  if (isset($_POST['submit_team_options'])) {
    // Check if it's an edit or add operation
    $team_id = isset($_POST['edit_team_id']) ? intval($_POST['edit_team_id']) : -1;

    // Sanitize input data
    $team_name = sanitize_text_field($_POST['team_name']);
    $team_role = sanitize_text_field($_POST['team_role']);
    $team_photo_url = sanitize_text_field($_POST['photo_url']);
    $team_social_media = array(
      'linkedin' => isset($_POST['linkedin']) ? esc_url($_POST['linkedin']) : '',
      'twitter' => isset($_POST['twitter']) ? esc_url($_POST['twitter']) : '',
    );

    // Get existing team members
    $team_option = get_option('team_options', array());

    // Add or update team member
    if ($team_id !== -1 && isset($team_option[$team_id])) {
      // Editing an existing team member
      $team_option[$team_id]['name'] = $team_name;
      $team_option[$team_id]['role'] = $team_role;
      $team_option[$team_id]['photo_url'] = $team_photo_url;
      $team_option[$team_id]['social_media'] = $team_social_media;
    } else {
      // Adding a new team member
      $new_team = array(
        'name' => $team_name,
        'role' => $team_role,
        'photo_url' => $team_photo_url,
        'social_media' => $team_social_media,
      );

      $team_option[] = $new_team;
    }

    // Update option
    update_option('team_options', $team_option);

    // Clear edit member id after submission
    unset($_POST['edit_team_id']);
  }

  // Display existing team members in a table
  $team_option = get_option('team_options', array());
  $team_id = isset($_GET['action']) && $_GET['action'] === 'edit' ? intval($_GET['team_id']) : -1;
?>
  <div class="wrap">
    <h1>Team List</h1>
    <!-- Team Member List form goes here -->
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <?php if ($team_id !== -1 && isset($team_option[$team_id])) : ?>
        <input type="hidden" name="edit_team_id" value="<?php echo $team_id; ?>">
      <?php endif; ?>

      <label for="member-name">Name:</label>
      <input type="text" id="member-name" name="team_name" placeholder="Team Member Name" value="<?php echo esc_attr($team_id !== -1 ? stripslashes($team_option[$team_id]['name']) : ''); ?>" required>
      <br>

      <label for="member-role">Role:</label>
      <input type="text" id="member-role" name="team_role" placeholder="Team Member Role" value="<?php echo esc_attr($team_id !== -1 ? stripslashes($team_option[$team_id]['role']) : ''); ?>" required>
      <br>

      <label for="photo-upload">Photo:</label>
      <div>
      <?php if ($team_id !== -1 && isset($team_option[$team_id]['photo_url'])) : ?>
          <img
            src="<?php echo esc_url($team_option[$team_id]['photo_url']); ?>"
            alt="Team Image"
            class="image-preview"
            id="team-image-preview"
          />
        <?php else : ?>
          <img
            alt="Team Image"
            class="image-preview"
            id="team-image-preview"
            style="display:none"
          />
        <?php endif; ?>
        <input type="text" name="photo_url" id="team-image-url" value="<?php echo esc_attr($team_id !== -1 ? esc_url($team_option[$team_id]['photo_url']) : ''); ?>">
        <button type="button" class="button" onclick="team_choose_media('team-image-url', 'team-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>
      <h2>Social Media</h2>
      <label for="linkedin">LinkedIn:</label>
      <input type="url" id="linkedin" name="linkedin" placeholder="LinkedIn Profile URL" value="<?php echo esc_url($team_id !== -1 && isset($team_option[$team_id]['social_media']['linkedin']) ? $team_option[$team_id]['social_media']['linkedin'] : ''); ?>">
      <br>

      <label for="twitter">Twitter:</label>
      <input type="url" id="twitter" name="twitter" placeholder="Twitter Profile URL" value="<?php echo esc_url($team_id !== -1 && isset($team_option[$team_id]['social_media']['twitter']) ? $team_option[$team_id]['social_media']['twitter'] : ''); ?>">
      <br>

      <!-- Add other social media fields here -->

      <input type="submit" name="submit_team_options" class="image-upload-btn" value="<?php echo $team_id !== -1 ? 'Update Member' : 'Add Member'; ?>">
    </form>

    <h2>Team Members</h2>

    <!-- Team Member List table goes here -->
    <?php if (!empty($team_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Photo</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($team_option as $team_index => $team_value) : ?>
            <tr>
              <td><?php echo $team_index + 1; ?></td>
              <td><?php echo esc_html(stripslashes($team_value['name'])); ?></td>
              <td><?php echo esc_html(stripslashes($team_value['role'])); ?></td>
              <td>
                <?php if (isset($team_value['photo_url'])) : ?>
                  <img src="<?php echo esc_url($team_value['photo_url']); ?>" alt="Team Member Photo" style="max-width: 100px; max-height: 100px;">
                <?php endif; ?>
              </td>
              <td>
                <a href="?page=team-option&action=edit&team_id=<?php echo $team_index; ?>" class="button button-primary">Edit</a>
                <a href="?page=team-option&action=delete&team_id=<?php echo $team_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this team member?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No team members added yet.</p>
    <?php endif; ?>
  </div>

  <script>
    function team_choose_media(targetInputId, tagetPreviewId) {
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

// Helper function to delete team member
function team_option_delete($team_id) {
  $team_option = get_option('team_options', array());

  if (isset($team_option[$team_id])) {
    unset($team_option[$team_id]);
    update_option('team_options', $team_option);
  }
}

// Action to handle deleting a team member
if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['team_id'])) {
  $team_id = intval($_GET['team_id']);
  team_option_delete($team_id);
}
