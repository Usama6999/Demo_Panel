// ** React Imports
import { useState, useEffect } from 'react';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal';

// ** Icons Imports
import { User, UserPlus, UserCheck } from 'react-feather';

// ** Axios Import
import axios from 'axios';
import Table from '../views/Users/table'

// ** Styles
import '@styles/react/apps/app-users.scss';

const UsersList = () => {
    // State to store totalResults
    const [totalSellers, setTotalSellers] = useState(0);
    const [totalBuyers, setTotalBuyers] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    // Function to fetch data from the API
    const fetchData = async () => {
        try {
            const totalUsers = await axios.get('http://localhost:5000/api/users/user/count-users')
            const response = await axios.get('http://localhost:5000/api/users/sellers');
            const buyersResponse = await axios.get('http://localhost:5000/api/users/buyer/all-buyers')
            const { totalResults } = response.data.response;
            const buyers = buyersResponse.data.response.totalResults;
            console.log(buyersResponse)
            // Set totalResults to the state
            setTotalSellers(totalResults);
            setTotalBuyers(buyers)
            setTotalUsers(totalUsers.data.response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        // Call the fetchData function
        fetchData();
    }, []); 

    return (
        <div className='app-user-list'>
            <Row>
                <Col lg='3' sm='6'>
                    <StatsHorizontal
                        color='primary'
                        statTitle='Total Users'
                        icon={<User size={20} />}
                        renderStats={<h3 className='fw-bolder mb-75'>{totalUsers}</h3>}
                    />
                </Col>
                {/* Add other StatsHorizontal components for Total Buyers and Total Sellers */}
                <Col lg='3' sm='6'>
                    <StatsHorizontal
                        color='danger'
                        statTitle='Total Buyers'
                        icon={<UserPlus size={20} />}
                        // Add your dynamic data here
                        renderStats={<h3 className='fw-bolder mb-75'>{totalBuyers}</h3>}
                    />
                </Col>
                <Col lg='3' sm='6'>
                    <StatsHorizontal
                        color='success'
                        statTitle='Total Sellers'
                        icon={<UserCheck size={20} />}
                        // Add your dynamic data here
                        renderStats={<h3 className='fw-bolder mb-75'>{totalSellers}</h3>}
                    />
                </Col>
            </Row>
            <Table/>
        </div>
    );
};

export default UsersList;
