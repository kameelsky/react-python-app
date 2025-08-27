"use client";

import { Modal, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import RegistrationTab from "./RegistrationTab";

export default function RegistrationModalLink({ link }: { link: string }): React.ReactNode {
    const [isOpened, modalHandlers] = useDisclosure(false);

    return (
        <>
            <p onClick={modalHandlers.open} className="hover:text-cyan-700 underline cursor-pointer">
                {link}
            </p>
            <Modal
                opened={isOpened}
                onClose={modalHandlers.close}
                closeOnClickOutside={false}
                title="Registration"
                transitionProps={{ transition: "fade", duration: 500 }}
                overlayProps={{ backgroundOpacity: 0.5, blur: 5 }}
            >
                <Tabs radius="md" defaultValue="registration">
                    <Tabs.List grow justify="center">
                        <Tabs.Tab value="registration">Register a new account</Tabs.Tab>
                        <Tabs.Tab value="recovery">Recover your password</Tabs.Tab>
                    </Tabs.List>
                    <Tabs.Panel value="registration">
                        <div className="mt-5">
                            <RegistrationTab modalHandlers={modalHandlers} />
                        </div>
                    </Tabs.Panel>
                    <Tabs.Panel value="recovery">
                        <div className="mt-5">In progres</div>
                    </Tabs.Panel>
                </Tabs>
            </Modal>
        </>
    );
}
