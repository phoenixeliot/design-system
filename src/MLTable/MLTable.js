import React from 'react'
import PropTypes from 'prop-types'
import { Descriptions, Table } from 'antd'
import { clone, merge } from 'lodash-es'
import { DownOutlined, RightOutlined } from '../MLIcon'
import classNames from 'classnames'
import { MLTableContextProvider } from '../MLConfigProvider/MLTableContext'
import isFunction from 'lodash-es/isFunction'

/**
 * Component for showing an un-expanded nested table, which is just a vertical list of column headers.
 */
class MLHeaderTable extends React.Component {
  render() {
    const { columns } = this.props
    return (
      <Descriptions
        className='ml-header-table'
        bordered
        layout='horizontal'
        column={1}
      >
        {columns.map((column) => (
          <Descriptions.Item key={column.dataIndex} label={column.title} />
        ))}
      </Descriptions>
    )
  }
}

MLHeaderTable.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.any),
}

/**
 * Component for showing basic tables, nested tables, and entity properties for rows in said tables.
 */
class MLTable extends React.Component {
  constructor(props) {
    super(props)
    this.validateProps(props)
    this.state = {}
    // Object.assign(this.state, this.getInitialColumnExpandedStates())
    if (props.draggableRows) {
      Object.assign(this.state,
        this.getInitialRowOrder(),
        {
          dragging: false,
          draggingRecordInfo: null,
          dropTargetRecordInfo: null,
        },
      )
    }
    Object.assign(this.state, {
      restructuredColumns: this.restructureColumns(props.columns),
    })
    // debugger;
  }

  validateProps(props) {
    if (props.draggableRows) {
      for (const column of props.columns) {
        if (column.sorter) {
          throw Error('MLTable draggableRows cannot be set when columns prop has `sorter`.')
        }
        if (column.filters) {
          throw Error('MLTable draggableRows cannot be set when columns prop has `filters`.')
        }
      }
      for (const row of this.restructureData(props.dataSource)) {
        if (row.children) {
          throw Error('MLTable draggableRows cannot be used with tree data.')
        }
      }
    }
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   if (prevProps.columns !== this.props.columns) {
  //     this.setState(Object.assign(
  //       this.getInitialColumnExpandedStates(),
  //     ))
  //   }
  //   if (this.props.draggableRows && (!prevState.rowOrder || prevProps.dataSource !== this.props.dataSource)) {
  //     this.setState(Object.assign(
  //       this.getInitialRowOrder(),
  //     ))
  //     // This rule is OK to ignore because of the above if statement.
  //     // But, consider using one of the alternatives here instead for new best practices:
  //     // https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops
  //     // eslint-disable-next-line react/no-did-update-set-state
  //     this.setState(this.getInitialColumnExpandedStates())
  //   }
  // }

  getInitialColumnExpandedStates() {
    return {
      columnExpandedStates: Object.fromEntries(this.props.columns.map((column) => (
        [column.dataIndex, this.props.defaultShowEmbeddedTableBodies || false]
      ))),
    }
  }

  getInitialRowOrder() {
    let sorter = () => 0
    let sortOrder = 'ascend'
    for (const column of this.props.columns) {
      if (column.defaultSortOrder) {
        sorter = column.sorter || sorter
        sortOrder = column.defaultSortOrder
      }
    }
    const data = clone(this.restructureData(this.props.dataSource))
    data.sort((a, b) => sortOrder === 'descend' ? -sorter(a, b) : sorter(a, b))
    const rowOrder = data.map((row) => (
      this.getRowKeyValue(row)
    ))
    return { rowOrder }
  }

  toggleColumnExpanded(column) {
    const stateTransform = (prevState) => ({
      ...prevState,
      columnExpandedStates: {
        ...prevState.columnExpandedStates,
        [column.dataIndex]: !this.state.columnExpandedStates[column.dataIndex],
      },
    })
    this.setState(stateTransform)
  }

  handleDragEnterRow(draggingRecordInfo, dropTargetRecordInfo) {
    this.setState({
      dropTargetRecordInfo,
    })
    if (draggingRecordInfo.rowIndex === dropTargetRecordInfo.rowIndex) {
      this.setState({ tempRowOrder: this.state.rowOrder })
      return
    }

    const newRowOrder = clone(this.state.rowOrder)
    const removedRow = newRowOrder.splice(draggingRecordInfo.rowIndex, 1)[0]
    if (draggingRecordInfo.rowIndex < dropTargetRecordInfo.rowIndex) {
      newRowOrder.splice(dropTargetRecordInfo.rowIndex, 0, removedRow)
    } else {
      newRowOrder.splice(dropTargetRecordInfo.rowIndex, 0, removedRow)
    }

    this.setState({
      dropTargetRecordInfo,
      tempRowOrder: newRowOrder,
    })
  }

  getRowKeyValue(row) {
    const { rowKey = 'key' } = this.props
    const rowKeyFinal = (isFunction(rowKey) ? rowKey(row) : rowKey)
    const rowKeyValue = row[rowKeyFinal] || JSON.stringify(row)
    return rowKeyValue
  }

  restructureData (dataSource) {
    // TODO: Might restructure more things here; for now just wrap objects in arrays
    const restructuredData = (Array.isArray(dataSource) ? dataSource : [dataSource]).map((row) => {
      const restructuredRow = {}
      for (const [key, value] of Object.entries(row)) {
        restructuredRow[key] = value
      }
      return restructuredRow
    })
    // Add extra empty row-bits to pad out for multi-row cells
    const flattenData = (data) => {
      // Singular datum
      // debugger
      if (!Array.isArray(data) && typeof data !== 'object') {
        return data
      }
      // Array of rows
      if (Array.isArray(data)) {
        const rows = data
        const flatRow = {}
        for (const row of rows) {
          for (const [key, value] of Object.entries(row)) {
            const flatValue = flattenData(value)
            debugger
            if (typeof data === 'object') {
              debugger
            } else {
              flatRow[key] = flatValue
            }
            debugger
            console.log()
            // can we recurse here?
          }
        }
      } else if (typeof data === 'object') {
        debugger
      }
      // return restructuredData.map((row) => {
      //   const flatRow = {}
      //   for (let [key, value] of Object.entries(row)) {
      //     if (!Array.isArray(value) && typeof value === 'object' && value !== null) {
      //       // recurse
      //       debugger
      //       // value = flattenData(value)
      //     } else if (Array.isArray(value)) {
      //       if (flatRow[key] === undefined) {
      //         flatRow[key] = []
      //       }
      //       const flatValue = flattenData(value)
      //       flatRow[key].push(value)
      //       debugger
      //     } else {
      //       flatRow[key] = value
      //       debugger
      //     }
      //   }
      //   return flatRow
      // })
    }

    // const flatData = restructuredData.map(flattenData)
    // debugger
    return restructuredData
  }

  reorderData (dataSource) {
    if (!this.props.draggableRows) {
      return dataSource
    }
    const rowOrder = this.state.tempRowOrder || this.state.rowOrder
    if (!rowOrder) { // This can happen if draggableRows is turned on after mount, before rowOrder gets populated
      return dataSource
    }
    const reorderedData = []
    for (const row of dataSource) {
      const rowKeyValue = this.getRowKeyValue(row)
      reorderedData[rowOrder.indexOf(rowKeyValue)] = row
    }
    return reorderedData
  }

  emitChange() {
    const eventData = {
      data: this.reorderData(this.restructureData(this.props.dataSource)),
    }
    if (this.props.draggableRows) {
      Object.assign(eventData, {
        rowOrder: this.state.rowOrder,
      })
    }
    this.props.onChange(eventData)
  }

  rowDragProps (record, rowIndex) {
    const rowKeyValue = this.getRowKeyValue(record)
    const classNameArr = []
    if (this.state.dragging && this.state.draggingRecordInfo && this.getRowKeyValue(this.state.draggingRecordInfo.record) === rowKeyValue) {
      classNameArr.push('ml-table-row-dragging')
      classNameArr.push('ml-table-row-drop-target')
    } else if (this.state.postDragStaleHoverCancel) {
      classNameArr.push('ml-table-row-drag-stale')
    }

    const rowHandlers = {
      className: classNames(classNameArr),
      draggable: true,
      onDragEnd: (e) => {
        this.setState({
          rowOrder: this.state.tempRowOrder || this.state.rowOrder,
          tempRowOrder: null,
          dragging: false,
          draggingRecordInfo: null,
          dropTargetRecordInfo: null,
        })
        this.emitChange()
      },
      onDragEnter: (e) => {
        e.preventDefault()
        const draggingRecordInfo = this.state.draggingRecordInfo
        const dropTargetRecordInfo = { record, rowIndex }

        this.handleDragEnterRow(draggingRecordInfo, dropTargetRecordInfo)
      },
      onDragOver: (e) => {
        e.preventDefault() // Needed to prevent animating back to original position
        e.stopPropagation()
      },
      onDragStart: (e) => {
        e.stopPropagation()
        this.setState({
          dragging: true,
          postDragStaleHoverCancel: true,
          draggingRecordInfo: { record, rowIndex },
        })
        e.dataTransfer.setData('application/json', JSON.stringify({
          record: record,
          rowIndex: rowIndex,
        }))
      },
    }
    if (!this.state.dragging && this.state.postDragStaleHoverCancel) {
      rowHandlers.onMouseMove = (e) => {
        this.setState({
          postDragStaleHoverCancel: false,
        })
      }
    }
    return rowHandlers
  }

  componentDidUpdate(prevProps, prevState) {
    Object.entries(this.props).forEach(([key, val]) =>
      prevProps[key] !== val && console.log(`Prop '${key}' changed`),
    )
    if (this.state) {
      Object.entries(this.state).forEach(([key, val]) =>
        prevState[key] !== val && console.log(`State '${key}' changed`),
      )
    }
    debugger
  }

  render() {
    // debugger
    const { showBody, dataSource, columns } = this.props
    if (!showBody) {
      return <MLHeaderTable columns={columns} />
    }
    // const addMultiRowRender = (originalColumn) => {
    //   const column = clone(originalColumn)
    //   if (column.children !== undefined) {
    //     column.children = clone(originalColumn.children).map(addMultiRowRender)
    //   } else {
    //     column.render = (text, record, index) => {
    //       console.log(originalColumn, column)
    //       debugger
    //     }
    //   }
    //   return column
    // }
    // const restructuredColumns = columns// .map(addMultiRowRender)
    // const restructuredColumns = this.restructuredColumns;
    // const restructuredColumns = columns.map((originalColumn) => {
    //   const restructuredColumn = clone(originalColumn)
    //   if (originalColumn.children !== undefined) {
    //     // if (originalColumn.dataIndex === undefined) {
    //     //   throw Error('dataIndex must be specified when nesting columns')
    //     // }
    //     // If the column has sub-columns, add a toggle to the header
    //     // restructuredColumn.onHeaderCell = (column) => {
    //     //   const originalOnHeaderCell = (originalColumn.onHeaderCell && originalColumn.onHeaderCell(originalColumn)) || {}
    //     //   // noinspection JSValidateTypes
    //     //   return merge(
    //     //     {
    //     //       style: { cursor: 'pointer' },
    //     //       onClick: () => this.toggleColumnExpanded(column),
    //     //     },
    //     //     originalOnHeaderCell,
    //     //   )
    //     // }
    //     // If the column has sub-columns, render a sub-table
    //     restructuredColumn.render = (text, record, index) => (
    //       <MLTable
    //         columns={originalColumn.children}
    //         dataSource={record[]}
    //       />
    //       // <MLTable
    //       //   columns={originalColumn.columns}
    //       //   dataSource={record[originalColumn.dataIndex]}
    //       //   // draggableRows={this.props.draggableRows}
    //       //   showBody={this.state.columnExpandedStates[originalColumn.dataIndex]}
    //       //   defaultShowEmbeddedTableBodies={this.props.defaultShowEmbeddedTableBodies}
    //       //   size={this.props.size}
    //       //   // onChange={(e) => this.handleEmbeddedTableChange(e, restructuredColumn, record)}
    //       // />
    //     )
    //   }
    //   return restructuredColumn
    // })

    const restructuredData = this.reorderData(this.restructureData(dataSource))

    // Determine how to modify the expand icon based on children and nested tables
    const hasTreeData = restructuredData.some((row) => (row.children !== undefined))
    const hasNestedTables = (this.props.expandedRowRender !== undefined)

    const restructuredExpandIcon = ({ expanded, onExpand, record }) => {
      if (!hasTreeData && !hasNestedTables) {
        // No rows will have an icon, so don't add spacers
        return null
      }
      const showIcon = record.children || hasNestedTables
      return (
        <div
          style={{ cursor: showIcon ? 'pointer' : 'inherit', width: '20px', display: 'inline-block' }}
          // className='ant-table-row-expand-icon ant-table-row-expand-icon-spaced'
        >
          {!showIcon ? null : (
            expanded ? (
              <DownOutlined onClick={e => onExpand(record, e)} />
            ) : (
              <RightOutlined onClick={e => onExpand(record, e)} />
            )
          )}
        </div>)
    }

    return (
      <MLTableContextProvider isInsideTable={true}>
        <Table
          pagination={{ hideOnSinglePage: true }}
          {...this.props} // This is positioned here so the above props can be overwritten if desired
          onChange={(pagination, filters, sorter, extra) => {
            this.state.rowOrder = extra.currentDataSource.map((r) => this.getRowKeyValue(r))
            this.emitChange()
          }}
          expandIcon={restructuredExpandIcon}
          dataSource={restructuredData} // But force the dataSource and columns to be our modified versions
          columns={this.state.restructuredColumns}
          className={classNames('ml-table', this.props.className)}
          onRow={(record, rowIndex) => {
            return Object.assign(
              {},
              (this.props.draggableRows ? this.rowDragProps(record, rowIndex) : {}),
            )
          }}
        />
      </MLTableContextProvider>
    )
  }

  restructureColumns(columns) {
    const thisWidget = this
    // const restructuredColumns = clone(columns)
    const restructuredColumns = columns
    for (const column of restructuredColumns) {
      // const originalColumn = clone(column)
      const originalColumn = column
      // if (column.children === undefined) {
      //   column.render = (value) => {
      //     return {
      //       children: value,
      //       props: {
      //         colSpan: 1,
      //         rowSpan: 1,
      //       },
      //     }
      //   }
      // }
      if (column.children !== undefined) {
        // column.children = clone(column.children)
        // column.children[0].colSpan = column.children.length
        column.children[0].render = (value, record, index) => {
          const countColSpan = (columns) => {
            // return 1
            let colSpan = 0
            for (const column of columns) {
              if (column.children === undefined) {
                colSpan += 1
              } else {
                colSpan += countColSpan(column.children)
              }
            }
            return colSpan
          }
          console.log('xxxCurrent column:', originalColumn, column)
          console.log('xxxCurrent record:', record)
          console.log('xxxRendering sub-MLTable with columns:', originalColumn.children, column.children)
          console.log('xxxand dataSource:', record[originalColumn.dataIndex], record[column.dataIndex])
          console.log(thisWidget)
          if (!record[originalColumn.dataIndex]) {
            return {
              children: value,
              colSpan: 0,
            }
          }
          return {
            children: (
              // <div>fuck off</div>
              <MLTable
                key={`${column.dataIndex} ${record.key}`}
                showHeader={false}
                dataSource={record[originalColumn.dataIndex] || record} // Record is automatically zoomed-in by Ant's table logic
                columns={originalColumn.children}
              />
            ),
            props: {
              colSpan: countColSpan([originalColumn]),
              rowSpan: 1,
            },
          }
        }
        for (const child of column.children.slice(1)) {
          child.render = (value, record, index) => {
            console.log(column, child, value, record, index)
            debugger;
            return (
              {
                props: {
                  colSpan: 0,
                },
              }
            )
          }
        }
      }
    }
    return restructuredColumns
  }
}

MLTable.defaultProps = {
  size: 'middle',
  showBody: true,
  bordered: true,
  onChange: () => {},
  rowKey: undefined,
  defaultShowEmbeddedTableBodies: false,
}

MLTable.propTypes = { // TODO: Include default Table props as well
  id: PropTypes.string,
  rowKey: PropTypes.string,
  showBody: PropTypes.bool,
  dataSource: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any), // Single item data sources are converted into arrays automatically (used in embedded table)
    PropTypes.arrayOf(PropTypes.any),
  ]),
  columns: PropTypes.arrayOf(PropTypes.any),
  /** Enable drag-n-drop rows
   *  Cannot be used with column sorters or tree data. */
  draggableRows: PropTypes.bool,
  /** Emits the current state of the Table state data:
   *  rowOrder: is the current order of rowKeys in the table
   *  data: is the reordered */
  onChange: PropTypes.func,
  /** Show the body of tables embedded inside table cells by default */
  defaultShowEmbeddedTableBodies: PropTypes.bool,
}

MLTable.displayName = 'MLTable'

export default MLTable
