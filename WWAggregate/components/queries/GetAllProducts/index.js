import React, { Component } from 'react';
import { Text, View } from 'react-native';
import gql from "graphql-tag";
import { withNavigation } from 'react-navigation';
import { useQuery, Query, ApolloConsumer } from "@apollo/react-hooks";

const GET_PRODUCTS = gql`
{
  products{
    name
    barcode
    nutrition
  }
}
`;