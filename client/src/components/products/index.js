import React, { useCallback, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback, ErrorInfoFallback } from "../../fallbacks";
import { useAsync } from "../../hooks/useAsync";
import fetchProductByName from "../../utils/api";

function ProductForm({ productName: externalproductName, submitproductName }) {
  const [productName, setproductName] = useState("");

  const error = "Name includes special characters";
  if (productName.includes("-")) {
    throw error;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    submitproductName(productName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={productName}
        onChange={(e) => setproductName(e.target.value)}
      />
      <button type="submit" disabled={!productName}>
        Submit
      </button>
    </form>
  );
}

function ProductInfo({ productName }) {
  const asyncCallback = useCallback(() => {
    if (!productName) {
      return;
    }
    return fetchProductByName(productName);
  }, [productName]);

  const state = useAsync(asyncCallback, {
    status: productName ? "pending" : "idle",
  });

  const { error, data, status } = state;

  if (status === "idle") {
    return <div>Submit your Product</div>;
  }

  if (status === "pending") {
    return <ProductPendingView name={productName} />;
  }

  if (status === "resolved") {
    console.log(data);
    return <ProductDataView data={data} />;
  }

  if (status === "rejected") {
    throw error;
  }

  throw new Error("This shouldn't be happening");
}

function ProductPendingView({ name }) {
  return <div>Fetching Data for {name}</div>;
}

function ProductDataView({ data: product }) {
  return (
    <div>
      <h4>{product.name}</h4>
      <p>{product.description}</p>
      <img src={product.image} alt="" />
    </div>
  );
}

function ProductFormErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={ErrorFallback} {...props} />;
}

function ProductInfoErrorBoundary(props) {
  return <ErrorBoundary FallbackComponent={ErrorInfoFallback} {...props} />;
}

export {
  ProductForm,
  ProductInfo,
  ProductDataView,
  ProductPendingView,
  ProductFormErrorBoundary,
  ProductInfoErrorBoundary,
};
