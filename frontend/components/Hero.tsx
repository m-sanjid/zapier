"use client";

import { PrimaryButton } from "./buttons/PrimaryButton";
import { SecondaryButton } from "./buttons/SecondaryButton";
import { Feature } from "./Feature";

export const Hero = () => {
  return (
    <div>
      <div className="flex justify-center">
        <div className="pt-4 max-w-md text-5xl font-semibold text-center">
          Automate as fast as you can type
        </div>
      </div>
      <div className="flex justify-center pt-2">
        <div className="pt-8 max-w-2xl text-xl font-normal text-center">
          AI gives you automation superpowers, and Zapier puts them to work,
          Pairing AI and Zapier helps you turn ideas into workflows and bots
          that work for you.
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <div className="flex">
          <PrimaryButton onclick={() => {}} size="big">
            Get Started free
          </PrimaryButton>
          <div className="pl-4">
            <SecondaryButton onclick={() => {}} size="big">
              Contact Sales
            </SecondaryButton>
          </div>
        </div>
      </div>

      <div>
        <Feature title={"Free Forever"} subtitle={"for core features"} />
      </div>
    </div>
  );
};
