export default {
  widgets: [
    {
      name: 'sanity-tutorials',
      options: {
        templateRepoId: 'sanity-io/sanity-template-gatsby-portfolio'
      }
    },
    {name: 'structure-menu'},
    {
      name: 'project-info',
      options: {
        __experimental_before: [
          {
            name: 'netlify',
            options: {
              description:
                'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
              sites: [
                {
                  buildHookId: '5f4db6170dca7246d56813f8',
                  title: 'Sanity Studio',
                  name: 'evanallan-portfolio-versiona-gatsby-studio',
                  apiId: 'cda5b579-119f-4d17-8e4c-5cea54ff90fa'
                },
                {
                  buildHookId: '5f4db61767e48b3bc578431a',
                  title: 'Portfolio Website',
                  name: 'evanallan-portfolio-versiona-gatsby',
                  apiId: '580d4406-567f-488f-a8df-7659788d52d1'
                }
              ]
            }
          }
        ],
        data: [
          {
            title: 'GitHub repo',
            value: 'https://github.com/dereksaffe/EvanAllan-Portfolio-VersionA-Gatsby',
            category: 'Code'
          },
          {
            title: 'Frontend',
            value: 'https://evanallan-portfolio-versiona-gatsby.netlify.app',
            category: 'apps'
          }
        ]
      }
    },
    {name: 'project-users', layout: {height: 'auto'}},
    {
      name: 'document-list',
      options: {title: 'Recent projects', order: '_createdAt desc', types: ['sampleProject']},
      layout: {width: 'medium'}
    }
  ]
}
