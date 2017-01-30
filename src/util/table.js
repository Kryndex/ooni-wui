import React from 'react'
import moment from 'moment'


const rowToAnomalyType = (row) => {
  if (row.anomaly === true || row.result === 'error') {
    if (row.anomaly_type && row.anomaly_type === 'warning') {
      return 'warning'
    } else {
      return 'danger'
    }
  } else if (row.anomaly === false || row.result === 'ok') {
    return 'success'
  }
}

export const formatDate = (d) => {
  return moment(d).format('lll')
}

export const renderCarret = (direction) => {
  if (direction === 'asc') {
    return (
      <span> <i className='fa fa-sort-amount-asc' /></span>
    )
  }
  if (direction === 'desc') {
    return (
      <span> <i className='fa fa-sort-amount-desc' /></span>
    )
  }
  return (
    <span />
  )
}

export const formatName = (deckIcons) => (cell, row) => {
  const deckIcon = deckIcons[row.deck_id]
  return <span><i className={`fa ${deckIcon}`} />{` ${cell}`}</span>
}

export const formatDeckName = (deckIcons, deckNames) => (cell, row) => {
  const deckIcon = deckIcons[row.deck_id]
  const deckName = deckNames[row.deck_id]
  if (deckName === undefined) {
    return <span><i className='fa fa-square' /> none</span>
  }
  return <span><i className={`fa ${deckIcon}`} />{` ${deckName}`}</span>
}

export const formatTime = (cell, row) => {
  return formatDate(cell)
}

export const formatResult = (cell, row) => {
  const anomalyType = rowToAnomalyType(row)
  if (anomalyType === 'warning') {
    return <i className='icon-error fa fa-warning' />
  } else if (anomalyType === 'danger') {
    return <i className='icon-error fa fa-warning' />
  } else if (anomalyType === 'success') {
    return <i className='icon-ok fa fa-check-circle-o' />
  }
  return <i className='icon-error fa fa-warning' />
}

export const formatViewButton = (onClick) => (cell, row) => {
  if (row.running === true) {
    return <div>
      {row.progress.toFixed(1)}% <i className='fa fa-spinner fa-pulse' />
    </div>
  }
  if (row.stale === true) {
    return <i className='icon-warning fa fa-warning' />
  }
  return <button className='btn btn-secondary' onClick={() => onClick(row)}>View</button>
}

export const rowClassNameFormat = (row, rowIdx) => {
  let className = 'tr-row'
  const anomalyType = rowToAnomalyType(row)
  if (anomalyType === 'warning') {
    className += ' tr-row-anomaly-warning'
  } else if (anomalyType === 'danger') {
    className += ' tr-row-anomaly-danger'
  } else if (anomalyType === 'success') {
    className += ' tr-row-normal'
  }
  return className
}