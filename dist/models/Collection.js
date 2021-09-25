"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
exports.Collection = void 0;
var types_1 = require("../types");
var uuid_1 = require("uuid");
var Document_1 = require("./Document");
var immer_1 = __importStar(require("immer"));
var batch_1 = __importDefault(require("./batch"));
var Collection = /** @class */ (function () {
    function Collection(id, subCollections) {
        this[_a] = true;
        this.id = id;
        this.reference = null;
        this.collections = subCollections;
    }
    Collection.prototype.setReference = function (reference) {
        return immer_1["default"](this, function (draft) {
            draft.reference = reference;
        });
    };
    // Document creation
    Collection.prototype.createDocument = function (data, skipAwait, merge) {
        var _b;
        if (merge === void 0) { merge = true; }
        return __awaiter(this, void 0, void 0, function () {
            var reference, id, newData, documentReference;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        id = (_b = data.id) !== null && _b !== void 0 ? _b : uuid_1.v4();
                        newData = immer_1["default"](data, function (draft) {
                            draft.id = id;
                        });
                        documentReference = reference.doc(id);
                        if (!skipAwait) return [3 /*break*/, 1];
                        documentReference.set(newData, { merge: merge });
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, documentReference.set(newData, { merge: merge })];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3: return [2 /*return*/, new Document_1.Document(newData, documentReference, this.collections)];
                }
            });
        });
    };
    // Getting
    Collection.prototype.getDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, documentReference, response, data;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        documentReference = reference.doc(id);
                        return [4 /*yield*/, documentReference.get()];
                    case 1:
                        response = _b.sent();
                        if (response.exists) {
                            data = response.data();
                            return [2 /*return*/, new Document_1.Document(data, documentReference, this.collections)];
                        }
                        else {
                            throw Error('Document does not exist, check your id');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.getDocuments = function (sortingPredicate, filterPredicate, paginationPredicate, editQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, query, snapshot;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        query = this.getQuery(reference, sortingPredicate, filterPredicate, paginationPredicate, editQuery);
                        return [4 /*yield*/, query.get()];
                    case 1:
                        snapshot = _b.sent();
                        if (!snapshot.empty) {
                            return [2 /*return*/, snapshot.docs.map(function (firebaseDocument) {
                                    var data = firebaseDocument.data();
                                    return new Document_1.Document(data, firebaseDocument.ref, _this.collections);
                                })];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    // Setting
    Collection.prototype.setDocument = function (newData) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, documentReference;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        documentReference = reference.doc(newData.id);
                        return [4 /*yield*/, documentReference.set(newData)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, new Document_1.Document(newData, documentReference, this.collections)];
                }
            });
        });
    };
    // Updating
    Collection.prototype.updateDocument = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, documentReference;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        documentReference = reference.doc(data.id);
                        return [4 /*yield*/, documentReference.update(data)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, new Document_1.Document(data, documentReference, this.collections)];
                }
            });
        });
    };
    // Deleting
    Collection.prototype.deleteDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        return [4 /*yield*/, reference.doc(id)["delete"]()];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.deleteCollection = function () {
        return __awaiter(this, void 0, void 0, function () {
            var dbBatch, collectionReference, snapshot;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dbBatch = batch_1["default"]();
                        collectionReference = this.getCollectionReference();
                        return [4 /*yield*/, collectionReference.get()];
                    case 1:
                        snapshot = _b.sent();
                        if (!!snapshot.empty) return [3 /*break*/, 3];
                        snapshot.docs.forEach(function (doc) { return dbBatch["delete"](doc.ref); });
                        return [4 /*yield*/, dbBatch.commit()];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Subscribing to changes
    Collection.prototype.subscribeToDocument = function (id, onDataChange, onError, onDataDoesNotExist) {
        var _this = this;
        var reference = this.getCollectionReference();
        return reference.doc(id).onSnapshot(function (snapshot) {
            if (snapshot.exists) {
                var data = snapshot.data();
                var document_1 = new Document_1.Document(data, snapshot.ref, _this.collections);
                onDataChange(document_1);
            }
            else {
                onDataDoesNotExist();
            }
        }, function (error) {
            onError(error);
        });
    };
    Collection.prototype.subscribeToDocuments = function (onDataChange, onError, sortingPredicate, filterPredicate, editQuery) {
        var _this = this;
        var reference = this.getCollectionReference();
        var query = this.getQuery(reference, sortingPredicate, filterPredicate, undefined, editQuery);
        return query.onSnapshot(function (snapshot) {
            if (!snapshot.empty) {
                var documents = snapshot.docs.map(function (firebaseDocument) {
                    var data = firebaseDocument.data();
                    return new Document_1.Document(data, firebaseDocument.ref, _this.collections);
                });
                onDataChange(documents);
            }
            else {
                onDataChange([]);
            }
        }, function (error) {
            onError(error);
        });
    };
    // Utility Methods
    Collection.prototype.getCollectionReference = function () {
        if (this.reference != null && types_1.isCollectionReference(this.reference)) {
            return this.reference;
        }
        else {
            throw Error('No reference set or is a document reference');
        }
    };
    Collection.prototype.getQuery = function (reference, sortingPredicate, filterPredicate, paginationPredicate, editQuery) {
        var newReference = reference;
        if (sortingPredicate != null) {
            newReference = newReference.orderBy(sortingPredicate.property, sortingPredicate.direction);
        }
        if (filterPredicate != null) {
            newReference = newReference.where(filterPredicate.property, filterPredicate.direction, filterPredicate.value);
        }
        if (paginationPredicate != null && paginationPredicate.page != null) {
            var lastIndex = paginationPredicate.pageSize * paginationPredicate.page + (paginationPredicate.page > 0 ? 1 : 0);
            newReference = newReference.startAt(lastIndex).limit(paginationPredicate.pageSize);
        }
        if (editQuery != null) {
            newReference = editQuery(newReference);
        }
        return newReference;
    };
    return Collection;
}());
exports.Collection = Collection;
_a = immer_1.immerable;
//# sourceMappingURL=Collection.js.map