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
import { isIDEnabled } from '../Types/IDEnabled';
import { isCollectionReference } from '../Types/CollectionReference';
import { v4 as uuidv4 } from 'uuid';
import { Document } from './Document';
var Collection = /** @class */ (function () {
    function Collection(id, subCollections) {
        this.id = id;
        this.db = null;
        this.reference = null;
        this.collections = subCollections;
    }
    Collection.prototype.setReference = function (previousPath) {
        if (this.db != null && previousPath == null) {
            this.reference = this.db.collection(this.getFullPath());
        }
        else {
            throw Error('DB reference does not exist or a path is being provided.');
        }
    };
    Collection.prototype.getFullPath = function () {
        return this.id;
    };
    Collection.prototype.createDocument = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var id, document_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.reference != null && isCollectionReference(this.reference))) return [3 /*break*/, 2];
                        id = uuidv4();
                        return [4 /*yield*/, this.reference.doc(id).set(data.toJS(), { merge: true })];
                    case 1:
                        _a.sent();
                        if (isIDEnabled(data) && data.has('id')) {
                            document_1 = data.set('id', id);
                            return [2 /*return*/, new Document(document_1, this.getFullPath(), this.collections)];
                        }
                        else {
                            throw Error('You must an id property to your data object.');
                        }
                        return [3 /*break*/, 3];
                    case 2: throw Error('No reference set');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.updateDocument = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.reference != null && isCollectionReference(this.reference))) return [3 /*break*/, 4];
                        if (!isIDEnabled(data)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reference.doc(data.id).update(data.toJS())];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, new Document(data, this.getFullPath(), this.collections)];
                    case 2: throw Error('You must an id property to your data object.');
                    case 3: return [3 /*break*/, 5];
                    case 4: throw Error('No reference set');
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.deleteDocument = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.reference != null && isCollectionReference(this.reference))) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.reference.doc(id)["delete"]()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Collection.prototype.subscribeToDocument = function (id, makeRecord, onDataChange, onError) {
        var _this = this;
        if (this.reference != null && isCollectionReference(this.reference)) {
            this.reference.doc(id).onSnapshot(function (snapshot) {
                if (snapshot.exists) {
                    var data = snapshot.data();
                    var record = makeRecord(data);
                    var document_2 = new Document(record, _this.getFullPath(), _this.collections);
                    onDataChange(document_2);
                }
            }, function (error) {
                onError(error);
            });
        }
    };
    return Collection;
}());
export { Collection };
//# sourceMappingURL=Collection.js.map