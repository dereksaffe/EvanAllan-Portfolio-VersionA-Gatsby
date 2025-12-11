import React from 'react'
import ProjectPreview from './project-preview'

import * as styles from './project-preview-grid.module.css'

function ProjectPreviewGrid(props) {
  const {nodes = [], title} = props
  const projectCount = nodes.length

  // Determine grid class based on number of projects
  const getGridClass = () => {
    if (projectCount <= 3) return styles.gridThree
    if (projectCount === 4) return styles.gridFour
    if (projectCount === 5) return styles.gridFive
    return styles.gridSix
  }

  return (
    <div className={styles.root}>
      {title && <h2 className={styles.headline}>{title}</h2>}
      <ul className={`${styles.grid} ${getGridClass()}`}>
        {nodes.map((node, index) => (
          <li key={node.id} className={styles.gridItem}>
            <ProjectPreview {...node} priority={index < 3} />
          </li>
        ))}
      </ul>
    </div>
  )
}

ProjectPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
}

export default ProjectPreviewGrid
