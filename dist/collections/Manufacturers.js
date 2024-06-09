"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manufacturers = void 0;
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
exports.Manufacturers = {
    slug: "manufacturers",
    admin: {
        useAsTitle: "mfg_name",
    },
    access: {
        read: isAdminOrHasAccess(),
        update: isAdminOrHasAccess(),
        delete: isAdminOrHasAccess(),
    },
    fields: [
        // {
        //   name: "user",
        //   type: "relationship",
        //   relationTo: "users",
        //   required: true,
        //   hasMany: false,
        //   admin: {
        //     condition: () => false,
        //   },
        // },
        {
            name: "mfg_name",
            label: "Manufacturer Name",
            type: "text",
            required: true,
        },
        {
            name: "description",
            type: "richText",
            label: "Manufacturer details",
        },
    ],
};
