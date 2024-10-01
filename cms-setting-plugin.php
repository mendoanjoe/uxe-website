<?php
/*
Plugin Name: CMS Setting
Description: Setting all frontend content
Version: 1.1
Author: Firmansyah <firman@callourstudio.com>
*/


// Define your plugin activation function
function my_plugin_activation() {
  // Check if Contact Form 7 is installed and active
  if ( ! is_plugin_active( 'contact-form-7/wp-contact-form-7.php' ) ) {
    // Deactivate the plugin
    deactivate_plugins( plugin_basename( __FILE__ ) );
    // Output a notice to the admin
    wp_die( 'Please install and activate Contact Form 7 plugin before activating this plugin.' );
  }
}
// Hook into plugin activation
register_activation_hook( __FILE__, 'my_plugin_activation' );

// Helper function to get attachment ID from image URL
function cms_plugin_get_image_by_id($image_url) {
  global $wpdb;
  $attachment = $wpdb->get_col($wpdb->prepare("SELECT ID FROM $wpdb->posts WHERE guid='%s';", $image_url));
  return $attachment[0];
}

function enqueue_plugin_styles() {
  // Get the URL to the plugin directory
  $plugin_url = plugin_dir_url( __FILE__ );
  // Enqueue plugin CSS file
  wp_enqueue_style( 'plugin-styles', $plugin_url . 'styles.css', array(), '1.0', 'all' );
}
add_action( 'admin_enqueue_scripts', 'enqueue_plugin_styles' );

add_action('graphql_register_types', function() {
  register_graphql_field('MediaItem', 'fullPathUrl', [
    'type' => 'String',
    'description' => __('The source URL of the media item.', 'your-textdomain'),
    'resolve' => function($media_item) {
      // Retrieve the relative URL from the media item
      $relative_url = $media_item->sourceUrl;
          
      // Generate the absolute URL based on your site's base URL
      $absolute_url = home_url($relative_url);
          
      return $absolute_url;
    },
  ]);
});

// Include necessary files
require_once plugin_dir_path(__FILE__) . 'includes/post-types.php';
require_once plugin_dir_path(__FILE__) . 'includes/career-types.php';
require_once plugin_dir_path(__FILE__) . 'includes/admin-menu.php';
require_once plugin_dir_path(__FILE__) . 'includes/solution-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/feature-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/vision-mission.php';
require_once plugin_dir_path(__FILE__) . 'includes/client-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/testimonial-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/team-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/career-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/background-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/footer-setting.php';
require_once plugin_dir_path(__FILE__) . 'includes/press-release-option.php';
require_once plugin_dir_path(__FILE__) . 'includes/hero-section.php';