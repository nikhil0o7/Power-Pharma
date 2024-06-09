"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
var isAdminOrHasAccess = function () {
    //@ts-ignore
    return function (_a) {
        var _user = _a.req.user;
        var user = _user;
        if (!user)
            return false;
        if (user.role === "admin")
            return true;
        if (user.role === "user")
            return false;
    };
};
exports.Products = {
    slug: "products",
    admin: {
        useAsTitle: "name",
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
    },
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: function () { return false; },
            },
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "text",
            label: "Product details",
        },
        {
            name: "detailed_description",
            type: "text",
            label: "Extra details",
        },
        {
            name: "manufacturer",
            label: "Manufacturer",
            type: "relationship",
            relationTo: "manufacturers",
            required: true,
            hasMany: false,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "product_category",
            label: "Category",
            type: "relationship",
            relationTo: "categories",
            required: true,
            hasMany: false,
            admin: {
                position: "sidebar",
            },
        },
        {
            name: "price",
            label: "Price",
            min: 0,
            max: 1000,
            type: "number",
            required: true,
        },
        // {
        //   name: "category",
        //   label: "Category",
        //   type: "select",
        //   options: PRODUCT_CATEGORIES.map(({ label, value }) => ({ label, value })),
        //   required: false,
        // },
        // {
        //   name: "product_files",
        //   label: "Product files(s)",
        //   type: "relationship",
        //   required: true,
        //   relationTo: "product_files",
        //   hasMany: false,
        // },
        {
            name: "approvedForSale",
            label: "Product status",
            type: "select",
            defaultValue: "pending",
            access: {
                create: function (_a) {
                    var _b;
                    var req = _a.req;
                    return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
                },
                read: function (_a) {
                    var _b;
                    var req = _a.req;
                    return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
                },
                update: function (_a) {
                    var _b;
                    var req = _a.req;
                    return ((_b = req.user) === null || _b === void 0 ? void 0 : _b.role) === "admin";
                },
            },
            options: [
                {
                    label: "Pending verification",
                    value: "pending",
                },
                {
                    label: "Approved",
                    value: "approved",
                },
                {
                    label: "Denied",
                    value: "denied",
                },
            ],
        },
        {
            name: "priceId",
            access: {
                create: function () { return false; },
                read: function () { return false; },
                update: function () { return false; },
            },
            type: "text",
            admin: {
                hidden: true,
            },
        },
        {
            name: "images",
            type: "array",
            label: "Product Images",
            minRows: 1,
            maxRows: 10,
            required: true,
            labels: {
                singular: "Image",
                plural: "Images",
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: "media",
                    required: true,
                },
            ],
        },
    ],
};
