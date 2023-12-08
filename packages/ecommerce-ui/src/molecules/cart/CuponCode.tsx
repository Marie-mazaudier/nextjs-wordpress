import React from 'react';
import { Button } from '../../atoms/button/Button';

export const CuponCode = () => {
    return (
      <div className="flex flex-wrap items-center justify-center gap-5 mt-10 md:justify-between">
        <form action="">
          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              className="h-full px-5 py-3 border rounded-lg focus:outline-none border-themeSecondary300"
              placeholder="Coupon Code"
            />
            <Button className="capitalize" size="md" color="dark" type="lg">
              Apply
            </Button>
          </div>
        </form>
        <Button className="w-full capitalize md:w-auto" size="md" color="primary" type="lg">
          Update Cart
        </Button>
      </div>
    );
};

