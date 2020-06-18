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
import { isCollectionReference } from '../Types/CollectionReference';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';
import shareDatabaseReference from './shareDatabaseReference';
import produce from 'immer';
var Collection = /** @class */ (function () {
    function Collection(id, subCollections) {
        this.subscriptions = [];
        this.id = id;
        this.db = null;
        this.reference = null;
        this.collections = subCollections;
        this.nextVisibleIndex = 0;
    }
    Collection.prototype.setReference = function (reference) {
        this.reference = reference;
        if (this.db != null && this.collections != null) {
            shareDatabaseReference(this.collections, this.db);
        }
    };
    // Document creation
    Collection.prototype.createDocument = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, id, newData, documentReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        id = data.id ? data.id : uuidv4();
                        newData = produce(data, function (draft) {
                            draft.id = id;
                        });
                        documentReference = reference.doc(id);
                        return [4 /*yield*/, documentReference.set(newData, { merge: true })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Document(newData, documentReference, this.collections)];
                }
            });
        });
    };
    // Getting
    Collection.prototype.getDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, documentReference, response, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        documentReference = reference.doc(id);
                        return [4 /*yield*/, documentReference.get()];
                    case 1:
                        response = _a.sent();
                        if (response.exists) {
                            data = response.data();
                            return [2 /*return*/, new Document(data, documentReference, this.collections)];
                        }
                        else {
                            throw Error('Document does not exist, check your id');
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.get = function (sortingPredicate, filterPredicate, paginationPredicate, editQuery) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, query, snapshot;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        query = this.getQuery(reference, sortingPredicate, filterPredicate, paginationPredicate, editQuery);
                        return [4 /*yield*/, query.get()];
                    case 1:
                        snapshot = _a.sent();
                        if (!snapshot.empty) {
                            this.nextVisibleIndex += snapshot.size + 1; // Page size would be the index for the last document retreived, so add one.
                            return [2 /*return*/, snapshot.docs.map(function (firebaseDocument) {
                                    var data = firebaseDocument.data();
                                    return new Document(data, firebaseDocument.ref, _this.collections);
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
    // Updating
    Collection.prototype.updateDocument = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var reference, documentReference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        documentReference = reference.doc(data.id);
                        return [4 /*yield*/, documentReference.update(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Document(data, documentReference, this.collections)];
                }
            });
        });
    };
    // Deleting
    Collection.prototype.deleteDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var reference;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        reference = this.getCollectionReference();
                        return [4 /*yield*/, reference.doc(id)["delete"]()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // Subscribing to changes
    Collection.prototype.subscribeToDocument = function (id, onDataChange, onError, onDataDoesNotExist) {
        var _this = this;
        var reference = this.getCollectionReference();
        var subscription = reference.doc(id).onSnapshot(function (snapshot) {
            if (snapshot.exists) {
                var data = snapshot.data();
                var document_1 = new Document(data, snapshot.ref, _this.collections);
                onDataChange(document_1);
            }
            else {
                onDataDoesNotExist();
            }
        }, function (error) {
            onError(error);
        });
        this.subscriptions.push(subscription);
        return subscription;
    };
    Collection.prototype.subscribe = function (onDataChange, onError, sortingPredicate, filterPredicate, editQuery) {
        var _this = this;
        var reference = this.getCollectionReference();
        var query = this.getQuery(reference, sortingPredicate, filterPredicate, undefined, editQuery);
        var subscription = query.onSnapshot(function (snapshot) {
            if (!snapshot.empty) {
                var documents = snapshot.docs.map(function (firebaseDocument) {
                    var data = firebaseDocument.data();
                    return new Document(data, firebaseDocument.ref, _this.collections);
                });
                onDataChange(documents);
            }
            else {
                onDataChange([]);
            }
        }, function (error) {
            onError(error);
        });
        this.subscriptions.push(subscription);
        return subscription;
    };
    // Implementation is not final, we must pass an original reference, passing a new array everytime is kind of useless.
    Collection.prototype.subscribeWithDiffing = function (onDataChange, onError, sortingPredicate, filterPredicate, editQuery) {
        var _this = this;
        var reference = this.getCollectionReference();
        var query = this.getQuery(reference, sortingPredicate, filterPredicate, undefined, editQuery);
        var subscription = query.onSnapshot(function (snapshot) {
            if (!snapshot.empty) {
                var map_1 = new Map();
                snapshot.docChanges().forEach(function (change) {
                    var data = change.doc.data();
                    switch (change.type) {
                        case 'added':
                        case 'modified':
                            map_1.set(data.id, new Document(data, change.doc.ref, _this.collections));
                            break;
                        case 'removed':
                            map_1["delete"](data.id);
                            break;
                    }
                });
                onDataChange(map_1);
            }
        }, function (error) {
            onError(error);
        });
        this.subscriptions.push(subscription);
        return subscription;
    };
    // Utility Methods
    Collection.prototype.removeAllSubscriptions = function () {
        this.subscriptions.forEach(function (subscription) { return subscription(); });
    };
    Collection.prototype.resetPagination = function () {
        this.nextVisibleIndex = 0;
    };
    Collection.prototype.getCollectionReference = function () {
        if (this.reference != null && isCollectionReference(this.reference)) {
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
        if (paginationPredicate != null) {
            if (paginationPredicate.page != null) {
                var lastIndex = paginationPredicate.pageSize * paginationPredicate.page + (paginationPredicate.page > 0 ? 1 : 0);
                newReference = newReference.startAt(lastIndex).limit(paginationPredicate.pageSize);
            }
            else {
                newReference = newReference.startAt(this.nextVisibleIndex).limit(paginationPredicate.pageSize);
            }
        }
        if (editQuery != null) {
            newReference = editQuery(newReference);
        }
        return newReference;
    };
    return Collection;
}());
export { Collection };
//# sourceMappingURL=Collection.js.map