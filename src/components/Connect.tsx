import React, { useState } from 'react';
import { web3Accounts, web3Enable } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import {
  Button,
  Text,
  Spinner,
  useToast,
  Flex,
  VStack,
  HStack,
  Avatar,
  Tooltip,
  IconButton,
  useClipboard
} from '@chakra-ui/react';
import { CopyIcon, CloseIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';

type TExtensionState = {
  data?: {
    accounts: InjectedAccountWithMeta[],
    defaultAccount: InjectedAccountWithMeta,
  }
  loading: boolean
  error: null | Error
};

const initialExtensionState: TExtensionState = {
  data: undefined,
  loading: false,
  error: null
};

export const Connect = () => {
  const [state, setState] = useState(initialExtensionState);
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(state.data?.defaultAccount.address || '');

  const handleConnect = async () => {
    setState({ ...initialExtensionState, loading: true });

    try {
      const injectedExtensions = await web3Enable('polkadot-extension-dapp-example');
      if (!injectedExtensions.length) {
        throw new Error('NO_INJECTED_EXTENSIONS');
      }

      const accounts = await web3Accounts();
      if (!accounts.length) {
        throw new Error('NO_ACCOUNTS');
      }

      setState({
        error: null,
        loading: false,
        data: {
          accounts,
          defaultAccount: accounts[0],
        }
      });
    } catch (error) {
      console.error('Error with connect', error);
      setState({ error, loading: false, data: undefined });
      toast({
        title: 'Connection error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDisconnect = () => {
    setState(initialExtensionState);
  };

  if (state.loading) {
    return (
      <Flex justify="center" align="center">
        <Spinner size="xl" color="orange.500" />
      </Flex>
    );
  }

  if (state.error) {
    return (
      <Text color="red.500" fontWeight="bold">
        Error with connect: {state.error.message}
      </Text>
    );
  }

  return (
    

    <VStack spacing={4}>
      {state.data ? (
        <HStack spacing={4}>
          <NextLink href={`/profile/${state.data.defaultAccount.address}`} passHref>
          <Avatar name={beautifyAddress(state.data.defaultAccount.address)} />
          </NextLink>
          <VStack align="start">
            <Text fontSize="lg">Hello, {beautifyAddress(state.data.defaultAccount.address)}</Text>
            <Tooltip label={state.data.defaultAccount.address} aria-label="Full address">
              <Text fontSize="sm">Full Address</Text>
            </Tooltip>
          </VStack>
          <IconButton
            aria-label="Copy address"
            icon={<CopyIcon />}
            onClick={onCopy}
            colorScheme="blue"
          />
          {hasCopied && <Text>Copied!</Text>}
          <IconButton
            aria-label="Disconnect"
            icon={<CloseIcon />}
            onClick={handleDisconnect}
          />
        </HStack>
      ) : (
        <Button onClick={handleConnect}>Connect</Button>
      )}
    </VStack>
  );
};

function beautifyAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export default Connect;
