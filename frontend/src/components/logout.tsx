import React from 'react';
import { ApolloConsumer } from '@apollo/client';
import { Redirect } from 'react-router-dom';

export default () => {

	return (
		<ApolloConsumer>
            {client=>{
                client.resetStore();
                return <Redirect to='/'/>
        }}
		</ApolloConsumer>
	);
};
