const API_URL = process.env.WORDPRESS_API_URL

async function fetchAPI(query = '', { variables }: Record<string, any> = {}) {
  const headers = { 'Content-Type': 'application/json' }

  if (process.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers[
      'Authorization'
    ] = `Bearer ${process.env.WORDPRESS_AUTH_REFRESH_TOKEN}`
  }

  // WPGraphQL Plugin must be enabled
  const res = await fetch(API_URL, {
    headers,
    method: 'POST',
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const json = await res.json()

  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllPosts() {
  const data = await fetchAPI(
    `
    query AllPosts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                fullPathUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
          }
        }
      }
    }
  `,
  )

  return data?.posts
}

export async function getAllProduct(afterCursor = "") {
  const data = await fetchAPI(
    `
    query AllProducts($first: Int = 6, $order: OrderEnum = DESC, $after: String = "") {
      products(
        first: $first
        where: {orderby: {field: DATE, order: $order}}
        after: $after
      ) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                fullPathUrl
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `,
    {
      variables: {
        after: afterCursor,
      },
    }
  )

  return data?.products
}

export async function getAllCareer(afterCursor = "") {
  const data = await fetchAPI(
    `
    query AllCareers($first: Int = 6, $order: OrderEnum = DESC, $after: String = "") {
      careers(
        first: $first
        where: {orderby: {field: DATE, order: $order}}
        after: $after
      ) {
        edges {
          node {
            title
            slug
            date
            location
            department
            role
            description
            type
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  `,
    {
      variables: {
        after: afterCursor,
      },
    }
  )

  return data?.careers
}

export async function getAllDepartment() {
  const data = await fetchAPI(
    `
    {
      careers {
        edges {
          node {
            department
          }
        }
      }
    }
  `,
    {
      variables: {},
    }
  )

  return data?.careers
}
export async function getAllRole() {
  const data = await fetchAPI(
    `
    {
      careers {
        edges {
          node {
            role
          }
        }
      }
    }
  `,
    {
      variables: {},
    }
  )

  return data?.careers
}

export async function getSettings() {
  const data = await fetchAPI(
    `
    query getSettings {
      featureOptions {
        description
        icon
        title
      }
      solutionOptions {
        description
        image_url
        title
      }
      visionAndMissionOptions {
        mission {
          description
          image_url
          title
        }
        vision {
          description
          image_url
          title
        }
      }
      clientOptions {
        alt
        logo_url
      }
      testimonialOptions {
        rating
        review_text
        reviewer_company_image
        reviewer_image
        reviewer_name
        reviewer_role
      }
      menus {
        nodes {
          id
          name
          menuItems {
            nodes {
              id
              label
              url
            }
          }
        }
      }
      products(first: 3) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                fullPathUrl
              }
            }
          }
        }
      }
      posts(first: 3, where: { categoryName: "news" }) {
        edges {
          node {
            title
            excerpt
            slug
            date
            featuredImage {
              node {
                sourceUrl
                fullPathUrl
              }
            }
            author {
              node {
                name
                firstName
                lastName
                avatar {
                  url
                }
              }
            }
            categories {
              edges {
                node {
                  name
                }
              }
            }
          }
        }
      }
      footerOptions {
        address
        explore_menu {
          name
          url
        }
        contact_menu {
          name
          url
        }
        follow_us_menu {
          name
          url
        }
      }
      backgroundOptions {
        hero_about_us {
          type
          url
        }
        hero_audit {
          type
          url
        }
        hero_blog {
          type
          url
        }
        hero_company {
          type
          url
        }
        hero_career {
          type
          url
        }
        hero_contact {
          type
          url
        }
        hero_csr {
          type
          url
        }
        hero_home {
          url
          type
        }
        hero_product {
          type
          url
        }
        hero_team {
          url
          type
        }
        hero_csr_video {
          type
          url
        }
        hero_career_video {
          type
          url
        }
        hero_audit_video {
          type
          url
        }
      }
      allformOptions {
        form_career {
          html
        }
        form_contact {
          html
        }
        form_subscribe {
          html
        }
      }
      teamOptions {
        name
        photo_url
        role
        social_media {
          linkedin
          twitter
        }
      }
      generalSettings {
        title
        description
      }
      heroSections {
        button_url
        description
        media_type
        media_url
        title
      }
      ceoMessage {
        image_url
        linkedin_url
        message
        name
        role
        personal_url
      }
      callourAbout {
        about
        statistic_1_title
        statistic_1_value
        statistic_2_title
        statistic_2_value
        statistic_3_title
        statistic_3_value
      }
      callourPartners {
        description
        image_url
        title
      }
      auditOptions {
        description
        icon
        title
      }
      cseOptions {
        benefit_list {
          description
          tagline
          title
        }
        featured_list {
          icon
          title
        }
        heading_description
        heading_tagline
        heading_title
      }
    }
  `,
  )

  return data
}
