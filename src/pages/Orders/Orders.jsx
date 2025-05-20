import axios from "axios";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    date: "",
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [orders, filters]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders/admin/orders");
      setOrders(response.data || []);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setError("Failed to load orders. Please try again.");
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let result = [...orders];

    if (filters.search) {
      result = result.filter(
        (order) =>
          order.email?.toLowerCase().includes(filters.search.toLowerCase()) ||
          order.id.toString().includes(filters.search)
      );
    }

    if (filters.status) {
      result = result.filter((order) => order.orderStatus === filters.status);
    }

    if (filters.date) {
      result = result.filter((order) =>
        new Date(order.createdAt).toLocaleDateString().includes(filters.date)
      );
    }

    setFilteredOrders(result);
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/admin/update-status/${orderId}`,
        {},
        { params: { status: newStatus } }
      );
      if (response.status === 200) {
        setOrders((prev) =>
          prev.map((order) =>
            order.id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
        toast.success("Order status updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order:", err);
      toast.error("Error updating order status");
    }
  };

  const getStatusBadge = (status) => {
    const classes = {
      PENDING: "bg-warning text-dark",
      PROCESSING: "bg-info text-dark",
      DELIVERED: "bg-success text-white",
      CANCELLED: "bg-danger text-white",
    };
    return (
      <span className={`badge ${classes[status] || "bg-secondary"}`}>
        {status}
      </span>
    );
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-5">
      <h2 className="mb-5 text-center fw-bold text-dark" style={{ fontSize: "2rem" }}>
        Admin Order Dashboard
      </h2>

      {/* Filter Bar */}
      <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="search"
              placeholder="Search by email or order ID"
              value={filters.search}
              onChange={handleFilterChange}
              className="form-control"
              style={{ transition: "all 0.3s" }}
            />
          </div>
          <div className="col-md-4">
            <select
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className="form-select"
              style={{ transition: "all 0.3s" }}
            >
              <option value="">All Statuses</option>
              <option value="PENDING">Pending</option>
              <option value="PROCESSING">Processing</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="col-md-4">
            <input
              type="text"
              name="date"
              placeholder="Filter by date (e.g., MM/DD/YYYY)"
              value={filters.date}
              onChange={handleFilterChange}
              className="form-control"
              style={{ transition: "all 0.3s" }}
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" style={{ width: "3rem", height: "3rem" }}>
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2 text-muted">Loading orders...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center text-muted">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="row">
          <AnimatePresence>
            {filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="col-md-6 col-lg-4 mb-4"
              >
                <div
                  className="card border-0 shadow-sm h-100"
                  style={{
                    borderRadius: "12px",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.05)";
                  }}
                >
                  <div className="card-header bg-light d-flex justify-content-between align-items-center">
                    <span className="fw-bold">Order #{order.id}</span>
                    <span className="text-muted">
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title mb-3 text-primary">
                      {order.email || "N/A"}
                    </h5>
                    <ul className="list-group list-group-flush mb-3">
                      <li className="list-group-item">
                        <i className="bi bi-geo-alt me-2"></i>
                        <strong>Address:</strong> {order.userAddress || "N/A"}
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-telephone me-2"></i>
                        <strong>Phone:</strong> {order.phoneNumber || "N/A"}
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-currency-rupee me-2"></i>
                        <strong>Amount:</strong> ₹{order.amount || "0"}
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-credit-card me-2"></i>
                        <strong>Payment Status:</strong>{" "}
                        {order.paymentStatus || "N/A"}
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-receipt me-2"></i>
                        <strong>Razorpay Order ID:</strong>{" "}
                        {order.razorpayOrderId || "N/A"}
                      </li>
                      <li className="list-group-item">
                        <i className="bi bi-tag me-2"></i>
                        <strong>Order Status:</strong>{" "}
                        {getStatusBadge(order.orderStatus)}
                      </li>
                    </ul>
                    <div className="mb-3">
                      <label
                        htmlFor={`status-${order.id}`}
                        className="form-label fw-bold"
                      >
                        Update Status
                      </label>
                      <select
                        id={`status-${order.id}`}
                        className="form-select"
                        value={order.orderStatus}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        style={{ transition: "all 0.3s" }}
                      >
                        <option value="PENDING">Pending</option>
                        <option value="PROCESSING">Processing</option>
                        <option value="DELIVERED">Delivered</option>
                        <option value="CANCELLED">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default OrderPage;