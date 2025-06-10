import { useRef, useState } from 'react';
import { Button, Input, Space, type InputRef, type TableColumnType, Table as AntDTable, Image } from 'antd';
import type { ColumnsType, FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

import AvatarPlaceholder from '@/asssets/images/avatar-placeholder.png';

interface TableProps<DataType> {
  columns: ColumnsType<DataType>;
  data: DataType[];
  columnsWithSearch?: string[];
  styles?: any;
}

const Table = <DataType,>(props: TableProps<DataType>) => {
  type DataIndex = keyof DataType;

  const { columns, data, columnsWithSearch = [], styles } = props;

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState<DataIndex>();
  const searchInput = useRef<InputRef>(null);

  const handleSearch = (selectedKeys: string[], confirm: FilterDropdownProps['confirm'], dataIndex: DataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex.toString()}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        // @ts-ignore
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) => {
      const searchResult =
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        );
      return dataIndex === 'name' ? (
        <div className={styles?.nameColumn}>
          <Image src="" fallback={AvatarPlaceholder} width={30} preview={false} /> <p>{searchResult}</p>
        </div>
      ) : (
        searchResult
      );
    },
  });

  return (
    <AntDTable<DataType>
      columns={columns.map((col: any) =>
        columnsWithSearch.includes(col.dataIndex) ? { ...col, ...getColumnSearchProps(col.dataIndex) } : { ...col }
      )}
      dataSource={data}
      pagination={{ showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items` }}
    />
  );
};

export default Table;
