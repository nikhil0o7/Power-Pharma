"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MfgQueryValidator = exports.QueryValidator = void 0;
var zod_1 = require("zod");
exports.QueryValidator = zod_1.z.object({
    category: zod_1.z.string().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    limit: zod_1.z.number().optional(),
});
exports.MfgQueryValidator = zod_1.z.object({
    product_category: zod_1.z.any().optional(),
    // mfg_name: z.string().optional(),
    manufacturer: zod_1.z.any().optional(),
    sort: zod_1.z.enum(["asc", "desc"]).optional(),
    limit: zod_1.z.number().optional(),
});
