import { Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowBigUpDash } from "lucide-react";
import Button from "./Button";

export default function ScrollToTop() {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <>
            <Affix position={{ bottom: 20, right: 20 }}>
                <Transition transition="slide-up" mounted={scroll.y > 0}>
                    {(transitionStyles) => (
                        <Button className="bg-cyan/50 text-cyan-800" leftSection={<ArrowBigUpDash />} style={transitionStyles} onClick={() => scrollTo({ y: 0 })}>
                            Scroll to top
                        </Button>
                    )}
                </Transition>
            </Affix>
        </>
    );
}
