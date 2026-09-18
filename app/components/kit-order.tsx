"use client";
import { useState } from "react";
import { shop } from "@/lib/content";
export function KitOrder() {
  const [grind, setGrind] = useState("ground");
  const soldOut = shop.availability === "sold-out";
  return (
    <div className="order-box">
      <fieldset>
        <legend>CHOOSE YOUR GRIND</legend>
        <div className="grind-options">
          {[
            {
              id: "ground",
              name: "Ground for Phin",
              note: "Ready for your first pour",
            },
            { id: "whole", name: "Whole Bean", note: "For your own grinder" },
          ].map((x) => (
            <label key={x.id} className={grind === x.id ? "selected" : ""}>
              <input
                type="radio"
                name="grind"
                value={x.id}
                checked={grind === x.id}
                onChange={() => setGrind(x.id)}
              />
              <span>
                <strong>{x.name}</strong>
                <small>{x.note}</small>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="pickup">
        <span aria-hidden="true">↗</span>
        <div>
          <h4>YOUR AUSTIN PICKUP</h4>
          <p>
            {shop.pickup.date}
            <br />
            {shop.pickup.area}
            <br />
            {shop.pickup.time}
          </p>
        </div>
      </div>
      <div className="order-total">
        <span>
          First Pour Kit <small>× 1</small>
        </span>
        <strong>${shop.price}.00</strong>
      </div>
      <button
        className="button purchase"
        disabled
        aria-describedby="checkout-status"
      >
        {soldOut ? "SOLD OUT — THANK YOU, AUSTIN" : "GET YOUR FIRST POUR KIT"}{" "}
        <span>↗</span>
      </button>
      <p id="checkout-status" className="checkout-status" role="status">
        {soldOut
          ? "This batch is all spoken for. Follow @phinandfoam for the next drop."
          : "Orders open soon. Pickup details and secure checkout are being finalized."}
      </p>
      <p className="selection-note">
        Your selection: {grind === "ground" ? "Ground for Phin" : "Whole Bean"}{" "}
        · No payment collected.
      </p>
    </div>
  );
}
