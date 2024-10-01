<?php
// includes/testimonial-option.php

// Create sub-menu
function testimonial_option_menu() {
  add_submenu_page(
    'cms-setting',
    'Testimonials',
    'Testimonials',
    'manage_options',
    'testimonial-option',
    'testimonial_option_page'
  );
}
add_action('admin_menu', 'testimonial_option_menu');

function testimonial_option_graphql() {
  register_graphql_field(
    'RootQuery',
    'testimonial_options',
    [
      'type' => ['list_of' => 'TestimonialOptionType'], // Define TestimonialOptionType below
      'resolve' => function () {
        return get_option('testimonial_options', array()); // Replace 'testimonial_options' with the name of your option
      },
    ]
  );

  register_graphql_object_type(
    'TestimonialOptionType',
    [
      'description' => 'Custom testimonial type',
      'fields' => [
        'rating' => [
          'type' => 'Int',
          'description' => 'Rating (1-5)',
          'resolve' => function ($testimonial_option) {
            return isset($testimonial_option['rating']) ? intval($testimonial_option['rating']) : null;
          },
        ],
        'review_text' => [
          'type' => 'String',
          'description' => 'Review Text',
          'resolve' => function ($testimonial_option) {
            return isset($testimonial_option['review_text']) ? stripslashes($testimonial_option['review_text']) : null;
          },
        ],
        'reviewer_image' => [
          'type' => 'String',
          'description' => 'Reviewer Image URL',
          'resolve' => function ($testimonial_option) {
            return isset($testimonial_option['reviewer_image_url']) ? esc_url($testimonial_option['reviewer_image_url']) : null;
          },
        ],
        'reviewer_name' => [
          'type' => 'String',
          'description' => 'Reviewer Name',
          'resolve' => function ($testimonial_option) {
            return isset($testimonial_option['reviewer_name']) ? stripslashes($testimonial_option['reviewer_name']) : null;
          },
        ],
        'reviewer_role' => [
          'type' => 'String',
          'description' => 'Reviewer Role',
          'resolve' => function ($testimonial_option) {
            return isset($testimonial_option['reviewer_role']) ? stripslashes($testimonial_option['reviewer_role']) : null;
          },
        ],
        'reviewer_company_image' => [
          'type' => 'String',
          'description' => 'Reviewer Company Image URL',
          'resolve' => function ($testimonial_option) {
            return isset($testimonial_option['reviewer_company_image_url']) ? esc_url($testimonial_option['reviewer_company_image_url']) : null;
          },
        ],
      ],
    ]
  );
}
add_action('graphql_register_types', 'testimonial_option_graphql');

// Testimonials page content
function testimonial_option_page() {
  // Process testimonial deletion
  if (isset($_GET['action']) && $_GET['action'] === 'delete' && isset($_GET['testimonial_id'])) {
    $testimonial_id = intval($_GET['testimonial_id']);
    testimonial_option_delete($testimonial_id);
  }

  if (!did_action('wp_enqueue_media')) {
    wp_enqueue_media();
  }

  // Process form submission
  if (isset($_POST['submit_testimonial_options'])) {
    // Check if it's an edit or add operation
    $edit_testimonial_id = isset($_POST['edit_testimonial_id']) ? intval($_POST['edit_testimonial_id']) : -1;

    // Sanitize input data
    $testimonial_rating = isset($_POST['rating']) ? intval($_POST['rating']) : 0;
    $testimonial_review_text = sanitize_textarea_field($_POST['review_text']);
    $testimonial_reviewer_name = sanitize_text_field($_POST['reviewer_name']);
    $testimonial_reviewer_role = sanitize_text_field($_POST['reviewer_role']);
    $testimonial_reviewer_image_url = sanitize_text_field($_POST['reviewer_image_url']);
    $testimonial_reviewer_company_image_url = sanitize_text_field($_POST['reviewer_company_image_url']);

    // Get existing testimonial-option
    $testimonial_option = get_option('testimonial_options', array());

    // Add or update testimonial
    if ($edit_testimonial_id !== -1 && isset($testimonial_option[$edit_testimonial_id])) {
      // Editing an existing testimonial
      $testimonial_option[$edit_testimonial_id] = array(
        'rating' => $testimonial_rating,
        'review_text' => $testimonial_review_text,
        'reviewer_name' => $testimonial_reviewer_name,
        'reviewer_role' => $testimonial_reviewer_role,
        'reviewer_image_url' => $testimonial_reviewer_image_url,
        'reviewer_company_image_url' => $testimonial_reviewer_company_image_url,
      );
    } else {
      // Adding a new testimonial
      $new_testimonial = array(
        'rating' => $testimonial_rating,
        'review_text' => $testimonial_review_text,
        'reviewer_name' => $testimonial_reviewer_name,
        'reviewer_role' => $testimonial_reviewer_role,
        'reviewer_image_url' => $testimonial_reviewer_image_url,
        'reviewer_company_image_url' => $testimonial_reviewer_company_image_url,
      );

      $testimonial_option[] = $new_testimonial;
    }

    // Update option
    update_option('testimonial_options', $testimonial_option);

    // Clear edit testimonial id after submission
    unset($_POST['edit_testimonial_id']);
  }

  // Display existing testimonial-option in a table
  $testimonial_option = get_option('testimonial_options', array());
  $edit_testimonial_id = isset($_GET['action']) && $_GET['action'] === 'edit' ? intval($_GET['testimonial_id']) : -1;
?>
  <div class="wrap">
    <h1>Testimonials</h1>
    <!-- Testimonials form goes here -->
    <form method="post" action="" class="form-wrap" enctype="multipart/form-data">
      <?php if ($edit_testimonial_id !== -1 && isset($testimonial_option[$edit_testimonial_id])) : ?>
        <input type="hidden" name="edit_testimonial_id" value="<?php echo $edit_testimonial_id; ?>">
      <?php endif; ?>

      <label for="rating">Rating:</label>
      <input type="number" id="rating" name="rating" placeholder="Rating (1-5)" min="1" max="5" value="<?php echo $edit_testimonial_id !== -1 ? esc_attr($testimonial_option[$edit_testimonial_id]['rating']) : ''; ?>" required>
      <br/>

      <label for="review-text">Review Text:</label>
      <textarea id="review-text" rows="8" name="review_text" placeholder="Review Text" required><?php echo $edit_testimonial_id !== -1 ? esc_textarea(stripslashes($testimonial_option[$edit_testimonial_id]['review_text'])) : ''; ?></textarea>
      <br/>

      <h2>Reviewer</h2>
      <label for="reviewer-image-upload">Image:</label>
      <div>
        <?php if ($edit_testimonial_id !== -1 && isset($testimonial_option[$edit_testimonial_id]['reviewer_image_url'])) : ?>
          <img
            src="<?php echo esc_url($testimonial_option[$edit_testimonial_id]['reviewer_image_url']); ?>"
            alt="Reviewer Image"
            class="image-preview"
            id="testimonial-image-preview"
          />
        <?php else : ?>
          <img
            alt="Reviewer Image"
            class="image-preview"
            id="testimonial-image-preview"
            style="display:none"
          />
        <?php endif; ?>
        <input type="text" name="reviewer_image_url" id="testimonial-image-url" value="<?php echo esc_attr($edit_testimonial_id !== -1 ? esc_url($testimonial_option[$edit_testimonial_id]['reviewer_image_url']) : ''); ?>">
        <button type="button" class="button" onclick="testimonial_choose_media('testimonial-image-url', 'testimonial-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br/>

      <label for="reviewer-name">Name:</label>
      <input type="text" id="reviewer-name" name="reviewer_name" placeholder="Reviewer Name" value="<?php echo $edit_testimonial_id !== -1 ? esc_attr(stripslashes($testimonial_option[$edit_testimonial_id]['reviewer_name'])) : ''; ?>" required>
      <br>

      <label for="reviewer-role">Role:</label>
      <input type="text" id="reviewer-role" name="reviewer_role" placeholder="Reviewer Role" value="<?php echo $edit_testimonial_id !== -1 ? esc_attr(stripslashes($testimonial_option[$edit_testimonial_id]['reviewer_role'])) : ''; ?>" required>
      <br>

      <label for="reviewer-company-image-upload">Company Logo:</label>
      <div>
      <?php if ($edit_testimonial_id !== -1 && isset($testimonial_option[$edit_testimonial_id]['reviewer_company_image_url'])) : ?>
          <img
            src="<?php echo esc_url($testimonial_option[$edit_testimonial_id]['reviewer_company_image_url']); ?>"
            alt="Company Image"
            class="image-preview"
            id="testimonial-company-image-preview"
          />
        <?php else : ?>
          <img
            alt="Company Image"
            class="image-preview"
            id="testimonial-company-image-preview"
            style="display:none"
          />
        <?php endif; ?>
        <input type="text" name="reviewer_company_image_url" id="testimonial-company-image-url" value="<?php echo esc_attr($edit_testimonial_id !== -1 ? esc_url($testimonial_option[$edit_testimonial_id]['reviewer_company_image_url']) : ''); ?>">
        <button type="button" class="button" onclick="testimonial_choose_media('testimonial-company-image-url', 'testimonial-company-image-preview');" style="width:100%">Select Image</button>
      </div>
      <br>

      <input type="submit" name="submit_testimonial_options" class="image-upload-btn" value="<?php echo $edit_testimonial_id !== -1 ? 'Update Testimonial' : 'Add Testimonial'; ?>">
    </form>

    <h2>Testimonials:</h2>

    <!-- Testimonials table goes here -->
    <?php if (!empty($testimonial_option)) : ?>
      <table class="wp-list-table widefat fixed striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Rating</th>
            <th>Review Text</th>
            <th>Reviewer Name</th>
            <th>Reviewer Role</th>
            <th>Reviewer Image</th>
            <th>Reviewer Company Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($testimonial_option as $testimonial_index => $testimonial_value) : ?>
            <tr>
              <td><?php echo $testimonial_index + 1; ?></td>
              <td><?php echo esc_html($testimonial_value['rating']); ?></td>
              <td><?php echo esc_html(stripslashes($testimonial_value['review_text'])); ?></td>
              <td><?php echo esc_html(stripslashes($testimonial_value['reviewer_name'])); ?></td>
              <td><?php echo esc_html(stripslashes($testimonial_value['reviewer_role'])); ?></td>
              <td>
                <?php if (isset($testimonial_value['reviewer_image_url'])) : ?>
                  <img src="<?php echo esc_url($testimonial_value['reviewer_image_url']); ?>" alt="Reviewer Image" style="max-width: 100px; max-height: 100px;">
                <?php endif; ?>
              </td>
              <td>
                <?php if (isset($testimonial_value['reviewer_company_image_url'])) : ?>
                  <img src="<?php echo esc_url($testimonial_value['reviewer_company_image_url']); ?>" alt="Reviewer Company Image" style="max-width: 100px; max-height: 100px;">
                <?php endif; ?>
              </td>
              <td>
                <a href="?page=testimonial-option&action=edit&testimonial_id=<?php echo $testimonial_index; ?>" class="button button-primary">Edit</a>
                <a href="?page=testimonial-option&action=delete&testimonial_id=<?php echo $testimonial_index; ?>" class="button button-secondary" onclick="return confirm('Are you sure you want to delete this testimonial?')">Delete</a>
              </td>
            </tr>
          <?php endforeach; ?>
        </tbody>
      </table>
    <?php else : ?>
      <p>No testimonial-option added yet.</p>
    <?php endif; ?>
  </div>

  <script>
    function testimonial_choose_media(targetInputId, tagetPreviewId) {
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

// Delete a testimonial
function testimonial_option_delete($testimonial_id) {
  // Get existing testimonial-option
  $testimonial_option = get_option('testimonial_options', array());

  // Remove the testimonial at the specified index
  if (isset($testimonial_option[$testimonial_id])) {
    unset($testimonial_option[$testimonial_id]);

    // Update option
    update_option('testimonial_options', $testimonial_option);

    // Redirect back to the testimonial-option page
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=testimonial-option'); ?>";
    </script>
    <?php
    exit;
  } else {
    // Testimonial not found, handle error or just redirect
    ?>
    <script>
      window.location.href = "<?php echo admin_url('admin.php?page=testimonial-option'); ?>";
    </script>
    <?php
    exit;
  }
}