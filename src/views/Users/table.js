import { Fragment, useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import DataTable from 'react-data-table-component';
import { ChevronDown, Share, Printer, FileText, File, Grid, Copy } from 'react-feather';
import { Row, Col, Card, Input, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '@styles/react/libs/react-select/_react-select.scss';
import '@styles/react/libs/tables/react-dataTable-component.scss';
import { columns } from './Columns';

const CustomHeader = ({ handlePerPage, rowsPerPage, handleFilter, searchTerm, toggleSidebar }) => {
    return (
        <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
            <Row>
                <Col xl='6' className='d-flex align-items-center p-0'>
                    <div className='d-flex align-items-center w-100'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            className='mx-50'
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            style={{ width: '5rem' }}
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                        <label htmlFor='rows-per-page'>Entries</label>
                    </div>
                </Col>
                <Col
                    xl='6'
                    className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
                >
                    <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
                        <label className='mb-0' htmlFor='search-invoice'>
                            Search:
                        </label>
                        <Input
                            id='search-invoice'
                            className='ms-50 w-100'
                            type='text'
                            value={searchTerm}
                            onChange={(e) => handleFilter(e.target.value)}
                        />
                    </div>

                    <div className='d-flex align-items-center table-header-actions'>
                        <UncontrolledDropdown className='me-1'>
                            <DropdownToggle color='secondary' caret outline>
                                <Share className='font-small-4 me-50' />
                                <span className='align-middle'>Export</span>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem className='w-100'>
                                    <Printer className='font-small-4 me-50' />
                                    <span className='align-middle'>Print</span>
                                </DropdownItem>
                                {/* Add more export options if needed */}
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

const UsersList = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState(0);
    const [sort, setSort] = useState('desc');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortColumn, setSortColumn] = useState('createdAt');
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePagination = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const handlePerPage = (e) => {
        const value = parseInt(e.currentTarget.value);
        setRowsPerPage(value);
    };

    const handleFilter = (val) => {
        setSearchTerm(val);
    };

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection);
        setSortColumn(column.sortField);
    };

    const CustomPagination = () => {
        const count = Number(Math.ceil(total / rowsPerPage));

        return (
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                onPageChange={(page) => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
            />
        );
    };

    useEffect(() => {
        fetch('http://localhost:5000/api/users/sellers')
            .then((response) => response.json())
            .then((data) => {
                setData(data.response.results);
                setTotal(data.response.totalResults);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <Fragment>
            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
                    <DataTable
                        noHeader
                        subHeader
                        sortServer
                        pagination
                        responsive
                        paginationServer
                        onSort={handleSort}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        paginationComponent={CustomPagination}
                        data={data}
                        columns={[
                           columns
                        ]}
                        subHeaderComponent={
                            <CustomHeader
                                rowsPerPage={rowsPerPage}
                                handleFilter={handleFilter}
                                handlePerPage={handlePerPage}
                            />
                        }
                    />
                </div>
            </Card>
        </Fragment>
    );
};

export default UsersList;
