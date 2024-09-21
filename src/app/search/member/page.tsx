"use client";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import Button from "@/components/button";
import { Member, MemberType, tourStore } from "@/store/tour";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MemberCount from "../components/MemberCount";

const cn = classNames.bind(styles);
const MEMBERS: MemberType[] = ["ADULT", "CHILD", "BABY"];

function Page() {
  const router = useRouter();
  const { setMembers } = tourStore();

  const [adult, setAdult] = useState<Member>();
  const [child, setChild] = useState<Member>();
  const [baby, setBaby] = useState<Member>();

  const hasNoMember = !adult && !child && !baby;

  return (
    <div className={cn("Page")}>
      <h1 className={cn("title")}>탑승할 사람을 입력해주세요</h1>

      <div className={cn("members")}>
        {MEMBERS.map((type) => (
          <MemberCount
            key={type}
            memberType={type}
            onCount={(count) => {
              const member =
                count === 0
                  ? undefined
                  : {
                      type,
                      count,
                    };

              switch (type) {
                case "ADULT":
                  setAdult(member);
                  break;
                case "CHILD":
                  setChild(member);
                  break;
                case "BABY":
                  setBaby(member);
                  break;
              }
            }}
          />
        ))}
      </div>

      <div className={cn("button-container")}>
        <Button
          fullWidth
          floating
          size="large"
          disabled={hasNoMember}
          onClick={() => {
            const result: Member[] = [];

            if (adult) {
              result.push(adult);
            }
            if (child) {
              result.push(child);
            }
            if (baby) {
              result.push(baby);
            }

            setMembers(result);

            router.replace("/");
          }}
        >
          입력 완료
        </Button>
      </div>
    </div>
  );
}

export default Page;
