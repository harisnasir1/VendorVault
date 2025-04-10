"use client";
import React, { useState } from "react";
import Requestpanle from '../Components/Newrequest panel/Requestpanle';
import Newcustomer from "../Components/Newrequest panel/Newcustomer";
import { Suggest } from "../Components/Small comps/Types";
import { useSelection } from "../Context/Leads/SelectionContext";
import Reqsubmit from "../Components/Newrequest panel/Reqsubmit";
import { AnimatePresence, motion, Variants } from "framer-motion";

type pageProps = {
  sideopen: boolean;
  ClassName: string;
};

type DirectionProps = {
  direction: number;
};

const variants: Variants = {
  enter: ({ direction }: DirectionProps) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
    zIndex: 3,
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "absolute",
    zIndex: 4,
  },
  exit: ({ direction }: DirectionProps) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute",
    zIndex: 3,
  }),
};

const Page: React.FC<pageProps> = (props) => {
  const [suggesteddata, setsuggesteddata] = useState<Suggest[]>([]);
  const { renderstep, direction } = useSelection();

  return (
    <div
      className={`relative w-full h-full flex justify-center items-center overflow-hidden ${props.ClassName}`}
    >
      {/* Default static view */}
      {renderstep === 0 && (
        <Requestpanle
          sideopen={props.sideopen}
          suggesteddata={suggesteddata}
          setsuggesteddata={setsuggesteddata}
        />
      )}

      {/* Step 2 stays visible even during transitions to 3 or 4 */}
      {[2, 3, 4].includes(renderstep) && (
        <motion.div
          key="step2"
          custom={{ direction }}
          initial="enter"
          animate={renderstep === 2 ? "center" : "exit"}
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="w-full h-full flex justify-center items-center"
          style={{ zIndex: renderstep === 2 ? 3 : 2 }}
        >
          <Reqsubmit sideopen={props.sideopen} />
        </motion.div>
      )}

      {/* Step 3 and Step 4 animate on top */}
      <AnimatePresence mode="wait" custom={{ direction }}>
        {renderstep === 3 && (
          <motion.div
            key="step3"
            custom={{ direction }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex justify-center items-center"
            style={{ zIndex: 4 }}
          >
           <Newcustomer  sideopen={props.sideopen}/>
          </motion.div>
        )}

        {renderstep === 4 && (
          <motion.div
            key="step4"
            custom={{ direction }}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5 }}
            className="w-full h-full flex justify-center items-center"
            style={{ zIndex: 4 }}
          >
            <h1>4</h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Page;