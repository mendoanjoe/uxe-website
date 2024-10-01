<?php
// includes/post-types.php

// Register custom post type for products
function custom_product_post_type() {
  $labels = array(
    'name'               => 'Products',
    'singular_name'      => 'Product',
    'menu_name'          => 'Products',
    'add_new'            => 'Add New',
    'add_new_item'       => 'Add New Product',
    'edit_item'          => 'Edit Product',
    'new_item'           => 'New Product',
    'view_item'          => 'View Product',
    'search_items'       => 'Search Products',
    'not_found'          => 'No products found',
    'not_found_in_trash' => 'No products found in trash',
  );

  $args = array(
    'labels'             => $labels,
    'public'             => true,
    'has_archive'        => true,
    'menu_position'      => 5,
    'supports'           => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
    'rewrite'            => array('slug' => 'products'),
    'taxonomies'         => array('product_category'), // Include the custom taxonomy
    'hierarchical'       => true,
    'show_in_graphql'    => true,
    'graphql_single_name' => 'product',
    'graphql_plural_name' => 'products',
    'publicly_queryable'  => true,
  );

  register_post_type('product', $args);
}
add_action('init', 'custom_product_post_type');

// Register custom taxonomy for product categories
function custom_product_taxonomy() {
  $labels = array(
    'name'              => 'Product Categories',
    'singular_name'     => 'Product Category',
    'search_items'      => 'Search Product Categories',
    'all_items'         => 'All Product Categories',
    'parent_item'       => 'Parent Product Category',
    'parent_item_colon' => 'Parent Product Category:',
    'edit_item'         => 'Edit Product Category',
    'update_item'       => 'Update Product Category',
    'add_new_item'      => 'Add New Product Category',
    'new_item_name'     => 'New Product Category',
    'menu_name'         => 'Product Categories',
  );

  $args = array(
    'labels'            => $labels,
    'show_ui'           => true,
    'show_admin_column' => true,
    'query_var'         => true,
    'rewrite'           => array('slug' => 'product-category'),
    'hierarchical'       => true,
    'show_in_graphql' => true,
    'graphql_single_name' => 'product_category',
    'graphql_plural_name' => 'product_categorys',
  );

  register_taxonomy('product_category', array('product'), $args);
}
add_action('init', 'custom_product_taxonomy');

function custom_product_filter($args, $post_type) {
  // Change this to the post type you are adding support for
  if ('product' === $post_type) {
    $args['show_in_graphql']    = true;
    $args['graphql_single_name'] = 'product';
    $args['graphql_plural_name'] = 'products';
    
  }
  return $args;
}
add_filter('register_post_type_args', 'custom_product_filter', 10, 2);

add_filter( 'register_taxonomy_args', function( $args, $taxonomy ) {

  if ( 'product_category' === $taxonomy ) {
    $args['show_in_graphql'] = true;
    $args['graphql_single_name'] = 'product_category';
    $args['graphql_plural_name'] = 'product_categorys';
  }

  return $args;

}, 10, 2 );

