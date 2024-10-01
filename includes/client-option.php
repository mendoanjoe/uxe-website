<?php
// includes/client-option.php

// Create sub-menu
function client_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Clients',
    'Clients',
    'manage_options',
    'client-option',
    'client_option_page'
  );
}
add_action('admin_menu', 'client_option_menu');

function client_option_graphql() {
  register_graphql_field(
    'RootQuery',
    'client_options',
    [
      'type' => ['list_of' => 'CustomClientType'], // Define CustomClientType below
      'resolve' => function () {
        return get_option('client_options', array()); // Replace 'client_options' with the name of your option
      },
    ]
  );

  register_graphql_object_type(
    'CustomClientType',
    [
      'description' => 'Custom client type',
      'fields' => [
        'logo_url' => [
          'type' => 'String',
          'description' => 'Client Logo URL',
          'resolve' => function ($client_option) {
            return isset($client_option['logo_url']) ? esc_url($client_option['logo_url']) : null;
          },
        ],
        'alt' => [
          'type' => 'String',
          'description' => 'Alt Text for Client Logo',
          'resolve' => function ($client_option) {
            return isset($client_option['alt']) ? stripslashes($client_option['alt']) : null;
          },
        ],
      ],
    ]
  );
}
add_action('graphql_register_types', 'client_option_graphql');

// Client List page content
function client_option_page() {
  // Process client deletion
  if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['client_id'])) {
    $client_id = intval($_GET['client_id']);
    client_option_delete($client_id);
  }

  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Process form submission
  if (isset($_POST['submit_client_options'])) {
    // Check if it's an edit or add operation
    $edit_client_id = isset($_POST['edit_client_id']) ? intval($_POST['edit_client_id']) : -1;

    // Sanitize input data
    $client_logo_url = isset($_POST['logo_url']) ? esc_url($_POST['logo_url']) : '';
    $client_alt = isset($_POST['alt']) ? sanitize_text_field($_POST['alt']) : '';

    // Get existing clients
    $client_option = get_option('client_options', array());

    // Add or update client
    if ($edit_client_id !== -1 && isset($client_option[$edit_client_id])) {
      // Editing an existing client
      $client_option[$edit_client_id]['logo_url'] = $client_logo_url;
      $client_option[$edit_client_id]['alt'] = $client_alt;
    } else {
      // Adding a new client
      $new_client = array(
        'logo_url' => $client_logo_url,
        'alt' => $client_alt,
      );

      $client_option[] = $new_client;
    }

    // Update option
    update_option('client_options', $client_option);

    // Clear edit client id after submission
    unset($_POST['edit_client_id']);
  }

  // Display existing clients in a table
  $client_option = get_option('client_options', array());
  $edit_client_id = isset($_GET['action']) && $_GET['action'] === 'edit' ? intval($_GET['client_id']) : -1;
?>
  <div class="wrap">
    <h1>Client List</h1>
    <!-- Client List form goes here -->
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <?php if ($edit_client_id !== -1 && isset($client_option[$edit_client_id])) : ?>
        <input type="hidden" name="edit_client_id" value="<?php echo $edit_client_id; ?>">
      <?php endif; ?>

      <label for="logo-url">Logo URL:</label>
      <div>
        <?php if ($edit_client_id !== -1 && isset($client_option[$edit_client_id]['logo_url'])) : ?>
          <img
            src="<?php echo esc_url($client_option[$edit_client_id]['logo_url']); ?>"
            alt="Client Image"
            class="image-preview"
            id="client-image-preview"
          />
        <?php else : ?>
          <img
            alt="Client Image"
            class="image-preview"
            id="client-image-preview"
            style="display:none"
          />
        <?php endif; ?>
        <input type="text" name="logo_url" id="client-image-url" value="<?php echo esc_attr($edit_client_id !== -1 ? esc_url($client_option[$edit_client_id]['logo_url']) : ''); ?>">
        <button type="button" class="button" onclick="client_choose_media('client-image-url', 'client-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <label for="alt">Alt Text:</label>
      <input type="text" id="alt" name="alt" placeholder="Alt Text for Client Logo" value="<?php echo esc_attr($edit_client_id !== -1 ? stripslashes($client_option[$edit_client_id]['alt']) : ''); ?>" required>
      <br>

      <input type="submit" name="submit_client_options" class="image-upload-btn" value="<?php echo $edit_client_id !== -1 ? 'Update Client' : 'Add Client'; ?>">
    </form>

    <h2>Existing Clients</h2>

    <!-- Client List table goes here -->
    <?php if (!empty($client_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Alt Text</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($client_option as $client_index => $client_value) : ?>
            <tr>
              <td><?php echo $client_index + 1; ?></td>
              <td>
                <img src="<?php echo esc_url($client_value['logo_url']); ?>" alt="<?php echo esc_attr($client_value['alt']); ?>" style="max-width: 100px; max-height: 100px;">
              </td>
              <td><?php echo esc_html(stripslashes($client_value['alt'])); ?></td>
              <td>
                <a href="?page=client-option&action=edit&client_id=<?php echo $client_index; ?>" class="button button-primary">Edit</a>
                <a href="?page=client-option&action=delete&client_id=<?php echo $client_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this client?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No clients added yet.</p>
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

// Delete a client
function client_option_delete($client_id) {
  // Get existing clients
  $client_option = get_option('client_options', array());

  // Remove the client at the specified index
  if (isset($client_option[$client_id])) {
    unset($client_option[$client_id]);

    // Update option
    update_option('client_options', $client_option);

    // Redirect back to the client list page
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=client-option'); ?>";
    </script>
    <?php
    exit;
  } else {
    // Client not found, handle error or just redirect
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=client-option'); ?>";
    </script>
    <?php
    exit;
  }
}

?>