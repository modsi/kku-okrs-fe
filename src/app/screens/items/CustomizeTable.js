import React, { useEffect, useState } from 'react'
import { Table } from 'antd';
import { useDispatch } from 'react-redux';

const defaultPagin = {
  pagination: {
    current: 1
  }
}

const customizeTableProps = {
  columns: [],
  rowKey: '',
  dataSource: [],
  pagination: defaultPagin,
  scroll: 0,
  storeSearch: null,
  flow: null,
  rowSelection: null,
  action: async () => { },
  onRefresh: null,
  pageSize: 10,
  hideOnSinglePage: false,
  showSizeChanger: true,
  expandActive: [],
  defaultExpand: true,
  bordered: true
}

const CustomizeTable = ({ columns, rowKey, dataSource, pagination, scroll, storeSearch, flow, rowSelection, action, onRefresh, pageSize = 10, hideOnSinglePage = false, showSizeChanger = true, expandActive = [], defaultExpand = true, bordered = false } = customizeTableProps) => {
  const defaultPagin = {
    pagination: {
      current: 1,
      pageSize: pageSize,
      hideOnSinglePage: hideOnSinglePage,
    }
  }

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [state, setState] = useState({ expandedRowKeys: "" })

  // useEffect(() => {
  //   if (dataSource == null) {
  //     fetch(defaultPagin)
  //   }

  // }, [dataSource])

  useEffect(() => {    
    if (expandActive && expandActive?.length > 0) {
      // console.log("expandActive >> " , expandActive)
      setState({
        expandedRowKeys: expandActive
      });
    }

  }, [expandActive])

  useEffect(() => {
    if (storeSearch) {
      fetch(defaultPagin)
    }

  }, [storeSearch])

  useEffect(() => {
    if (onRefresh) {
      const resp = onRefresh?.result
      if (resp?.status?.code === "000") {
        fetch(defaultPagin)
      }
    }
  }, [onRefresh])

  useEffect(() => {
    if (flow) {
      fetch({ pagination: pagination })
    }

  }, [flow])

  const handleTableChange = (pagination, filters, sorter) => {
    fetch({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const fetch = async (params = {}) => {
    setLoading(true)
    dispatch(await action(
      {
        ...storeSearch,
        ...params,
        pagination: {
          ...params.pagination,
          showSizeChanger: showSizeChanger,
          pageSizeOptions: [10, 20, 50, 100, 200],
        },

      }
    ))
    setLoading(false)
  };

  function onTableRowExpand(expanded, record) {
    console.log('expanded, record',expanded, record.key);
    var keys = [...state.expandedRowKeys];
    if (expanded) {
      keys.push(record.key); // I have set my record.id as row key. Check the documentation for more details.
      // console.log('keyskeyskeys',keys);
      // keys
      setState({
        expandedRowKeys: keys
      });
    } else {
      var array = [...keys]; // make a separate copy of the array
      var index = array.indexOf(record.key)
      if (index !== -1) {
        array.splice(index, 1);
        setState({ expandedRowKeys: array });
      }
    }
  }
  console.log('state.pagination',pagination);
  return (
    <>
      <Table
        style={{ whiteSpace: 'pre' }}
        columns={columns}
        rowKey={(record, index) => rowKey ? record[rowKey] : index}
        dataSource={dataSource}
        pagination={pagination}
        loading={loading}
        scroll={{ x: 'max-content' }}
        // scroll="scroll"
        size="small"
        onChange={handleTableChange}
        // bordered
        bordered={bordered}
        rowSelection={rowSelection}

        // test
        expandable={{
          defaultExpandAllRows: defaultExpand

        }}
        expandedRowKeys={defaultExpand ? state.expandedRowKeys : ""}
        onExpand={onTableRowExpand}
      />
    </>
  );

}

export default CustomizeTable
