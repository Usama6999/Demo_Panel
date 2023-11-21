// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';

// ** Icons Imports
import { MoreVertical, FileText, Trash2, Archive } from 'react-feather';

// ** Reactstrap Imports
import { Badge, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// ** Renders User Columns
const renderUser = row => {
    const fullName = `${row.firstName} ${row.lastName}`;

    if (row.displayPicture) {
        return <Avatar className='me-1' img={row.displayPicture} width='32' height='32' />;
    } else {
        return (
            <Avatar
                initials
                className='me-1'
                color={row.avatarColor || 'light-primary'}
                content={fullName || 'John Doe'}
            />
        );
    }
};

// ** Renders Location Columns
const renderLocation = row => {
    const { house, street, city, country } = row.address;
    return `${house}, ${street}, ${city}, ${country}`;
};

// ** Renders Company Name Columns
const renderCompanyName = row => {
    return row.company?.companyName || 'N/A';
};

// ** Renders Joining Date Columns
const renderJoiningDate = row => {
    const joiningDate = new Date(row.createdAt);
    return joiningDate.toDateString();
};

export const columns = [
    {
        name: 'User',
        sortable: true,
        minWidth: '300px',
        sortField: 'fullName',
        selector: row => row.fullName,
        cell: row => (
            <div className='d-flex justify-content-left align-items-center'>
                {renderUser(row)}
                <div className='d-flex flex-column'>
                    <Link
                        to={`/apps/user/view/${row.id}`}
                        className='user_name text-truncate text-body'
                        onClick={() => store.dispatch(getUser(row.id))}
                    >
                        <span className='fw-bolder'>{renderUser(row)}</span>
                    </Link>
                    <small className='text-truncate text-muted mb-0'>{row.email}</small>
                </div>
            </div>
        ),
    },
    {
        name: 'Location',
        minWidth: '200px',
        sortable: true,
        sortField: 'address',
        selector: row => row.address,
        cell: row => renderLocation(row),
    },
    {
        name: 'Company Name',
        minWidth: '200px',
        sortable: true,
        sortField: 'companyName',
        selector: row => row.company?.companyName,
        cell: row => renderCompanyName(row),
    },
    {
        name: 'Joining Date',
        minWidth: '200px',
        sortable: true,
        sortField: 'createdAt',
        selector: row => row.createdAt,
        cell: row => renderJoiningDate(row),
    },
    {
        name: 'Actions',
        minWidth: '100px',
        cell: row => (
            <div className='column-action'>
                <UncontrolledDropdown>
                    <DropdownToggle tag='div' className='btn btn-sm'>
                        <MoreVertical size={14} className='cursor-pointer' />
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem
                            tag={Link}
                            className='w-100'
                            to={`/apps/user/view/${row.id}`}
                            onClick={() => store.dispatch(getUser(row.id))}
                        >
                            <FileText size={14} className='me-50' />
                            <span className='align-middle'>Details</span>
                        </DropdownItem>
                        <DropdownItem tag='a' href='/' className='w-100' onClick={e => e.preventDefault()}>
                            <Archive size={14} className='me-50' />
                            <span className='align-middle'>Edit</span>
                        </DropdownItem>
                        <DropdownItem
                            tag='a'
                            href='/'
                            className='w-100'
                            onClick={e => {
                                e.preventDefault();
                                store.dispatch(deleteUser(row.id));
                            }}
                        >
                            <Trash2 size={14} className='me-50' />
                            <span className='align-middle'>Delete</span>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        ),
    },
];
