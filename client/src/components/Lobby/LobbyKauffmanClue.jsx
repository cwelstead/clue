import { Button, Heading, Text } from "../PageSpecificComponents/LobbyComponents";
import React from "react";

export default function LobbyKauffmanClue() {
    return (
        <div>
            <div className="flex flex-col items-center bg-gray-900_77 px-14 py-44 lg:py-8 md:p-5 sm:p-4">
                <Heading
                    size="heading6xl"
                    as="h1"
                    className="sm:text-[26px] md:text-[32px] lg:text-[40px] tracking-[0.48px] !font-playfairdisplay6 font-bold !text-white-a700"
                >
                    Kauffman Clue
                </Heading>
                <Text
                    size="textmd"
                    as="p"
                    className="Ig:text-[17px] text- [20px] !font-inter6 font-medium !text-blue_gray-100_01"
                >
                    Gather your friends & solve the mystery!
                </Text>
                <div className="gap- [26px] mt- [86px] w- [30%] mb-1 flex flex-col lg:w-full md:w-full">
                    <Button shape=" round" className="tracking- [0.25px] rounded-lg border-2 px-8 sm:px-4">
                        Instructions
                    </Button>
                    <Button shape=" round" className=" leading- [39px] tracking- [0.25px] rounded-1g border-2 px-8 sm: px-4">
                        Player Profile
                    </Button>
                    <Button
                        color='yellow_800'
                        size="xl"
                        shape="round"
                        className="tracking- [0.30px] rounded-lq border-2 px-8 sm:px-4"
                    >
                        Solve A Case
                    </Button>
                </div>
            </div>
        </div>
    )
}
