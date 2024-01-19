import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button
  } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { web3Enable, web3Accounts } from '@polkadot/extension-dapp';
import { InjectedAccount } from '@polkadot/extension-inject/types';

  const PolkadotConnectPopup: React.FC = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [accounts, setAccounts] = useState<InjectedAccount[]>([]);
  
    const connectToPolkadot = async () => {
      const extensions = await web3Enable('MyApp');
      if (extensions.length === 0) {
        // handle no extension found
        return;
      }
  
      const polkadotAccounts = await web3Accounts();
      setAccounts(polkadotAccounts);
      // handle accounts
    };
  
    useEffect(() => {
      connectToPolkadot();
    }, []);
  
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect to Polkadot</ModalHeader>
          <ModalBody>
            {/* List accounts here */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
  export default PolkadotConnectPopup;
  