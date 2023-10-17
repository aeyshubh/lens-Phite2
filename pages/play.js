'use client';
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_2 = require("react");
var wagmi_1 = require("wagmi");
var lensOracle_1 = require("../utils/lensOracle");
var ethers_1 = require("ethers");
var client_1 = require("@apollo/client");
var message_1 = require("../utils/message");
require("dotenv/config");
var PushAPI = require("@pushprotocol/restapi");
var buttonClickSound = '/sounds/smb_coin.mp3';
function Play() {
    var _this = this;
    var PK = 'your PK'; // channel private key
    var Pkey = "0x".concat(PK);
    var _signer = new ethers_1.ethers.Wallet(Pkey);
    require('dotenv').config();
    var _a = (0, react_2.useState)(''), handle = _a[0], setHandle = _a[1];
    var _b = (0, react_2.useState)(''), pid = _b[0], setId = _b[1];
    var _c = (0, react_2.useState)(''), profile = _c[0], setProfile = _c[1];
    var _d = (0, react_2.useState)(''), secondP = _d[0], setsecondP = _d[1];
    var _e = (0, react_2.useState)(''), secondId = _e[0], setsecondId = _e[1];
    var _f = (0, react_2.useState)(0), score1 = _f[0], setScore1 = _f[1];
    var _g = (0, react_2.useState)(0), score2 = _g[0], setScore2 = _g[1];
    var _h = (0, react_2.useState)(0), a1 = _h[0], seta1 = _h[1];
    var _j = (0, react_2.useState)(0), a2 = _j[0], seta2 = _j[1];
    var _k = (0, react_2.useState)(0), a3 = _k[0], seta3 = _k[1];
    var _l = (0, react_2.useState)(0), a4 = _l[0], seta4 = _l[1];
    var _m = (0, react_2.useState)(0), a5 = _m[0], seta5 = _m[1];
    var _o = (0, react_2.useState)(0), a6 = _o[0], seta6 = _o[1];
    var _p = (0, react_2.useState)(''), n1 = _p[0], setn1 = _p[1];
    var _q = (0, react_2.useState)(''), n2 = _q[0], setn2 = _q[1];
    var _r = (0, react_2.useState)(false), winner = _r[0], setWinner = _r[1];
    var _s = (0, react_2.useState)(""), secondAddress = _s[0], setSecondAddress = _s[1];
    var _t = (0, react_2.useState)(false), isButtonClicked = _t[0], setIsButtonClicked = _t[1];
    // Animation and battle function
    var abi_OueryOracle = lensOracle_1.abi2;
    var contractAddress_OueryOracle = '0x3f235D6A85b138025037E211862A57433d5AC467';
    var playedOnce = 0;
    var a = 'staging;';
    var sendNotification = function (p1, p2) { return __awaiter(_this, void 0, void 0, function () {
        var apiResponse, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, PushAPI.payloads.sendNotification({
                            signer: _signer,
                            type: 1,
                            identityType: 2,
                            notification: {
                                title: "Lens Phite Match Results",
                                body: "We just had a Fight in Lens Phite"
                            },
                            payload: {
                                title: "Lens Phite Results",
                                body: "".concat(p1, " WON against ").concat(p2, " with ").concat(n1, " Powers and ").concat(score1),
                                cta: '',
                                img: ''
                            },
                            channel: 'eip155:5:0x82a7A0828fa8EB902f0508620Ee305b08634318A'
                        })];
                case 1:
                    apiResponse = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.error('Error: ', err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    sendNotification("a1", "a2");
    //const users = ["0x01", "0x7a", "0x8fef", "0x02", "0x015", "0x3aed", "0x06", "0x0202"]
    var users = ["0x8fef", "0x8fef", "0x8fef"];
    //const users = ["0x02","0x8fef", "0x7a"];
    // const { address, isConnected, isDisconnected } = useAccount();
    // const address = data?.address;
    var response;
    var provider;
    var signer;
    var _u = (0, wagmi_1.useAccount)(), address = _u.address, isConnected = _u.isConnected, isDisconnected = _u.isDisconnected;
    // const address = data?.address;
    var API_URL = 'https://api-mumbai.lens.dev';
    var client = new client_1.ApolloClient({
        uri: API_URL,
        cache: new client_1.InMemoryCache()
    });
    var contractWrite;
    (0, react_1.useEffect)(function () {
        if (typeof window !== "undefined") {
            provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
            provider.send('eth_requestAccounts', []);
            signer = provider.getSigner();
            contractWrite = new ethers_1.ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);
        }
        if (score2 == 0) {
            fetchProfiles(),
                fetchSecondProfile();
        }
        else {
            mintNft();
        }
    }, [score2]);
    (0, react_1.useEffect)(function () { specialAttacks(); }, [a6]);
    var specialAttacks = function () { return __awaiter(_this, void 0, void 0, function () {
        var nftContract, contractWrite2, temp, writen3, writen3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                    provider.send('eth_requestAccounts', []);
                    signer = provider.getSigner();
                    nftContract = "0x16cb27EB3B6e2c3dA78e08f54F41b329a6C0B1F3";
                    contractWrite2 = new ethers_1.ethers.Contract(nftContract, message_1.abi4, signer);
                    setIsButtonClicked(true);
                    setTimeout(function () {
                        setIsButtonClicked(false);
                    }, 1000);
                    if (!(n1 == 'Fire' && n2 == 'Water')) return [3 /*break*/, 4];
                    alert("Giving 2000 HP to Player 1");
                    temp = 2000 + Number(a1) + Number(a2) + Number(a3);
                    if (!(temp > score2)) return [3 /*break*/, 2];
                    alert("Player 1 Wins with Special powers");
                    setScore2(temp - score2);
                    return [4 /*yield*/, contractWrite2.trainop(address, { gasLimit: 5000000 })];
                case 1:
                    writen3 = _a.sent();
                    console.log("Hash 3", writen3.hash);
                    sendNotification(pid, secondP);
                    return [3 /*break*/, 4];
                case 2:
                    alert("Player 2 Wins");
                    setScore1(temp - score1);
                    return [4 /*yield*/, contractWrite2.trainop(secondAddress, { gasLimit: 5000000 })];
                case 3:
                    writen3 = _a.sent();
                    console.log("Hash 3", writen3.hash);
                    sendNotification(secondP, pid);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleEvent = function () { return __awaiter(_this, void 0, void 0, function () {
        var writen, writen2, provider2, contractRead, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsButtonClicked(true);
                    setTimeout(function () {
                        setIsButtonClicked(false);
                    }, 1000);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                    provider.send('eth_requestAccounts', []);
                    signer = provider.getSigner();
                    contractWrite = new ethers_1.ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);
                    console.log("Id 1 :", pid);
                    return [4 /*yield*/, provider.send('eth_requestAccounts', [])];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, contractWrite.request(pid)];
                case 3:
                    writen = _a.sent();
                    console.log("Written One" + writen.hash);
                    console.log("Id2 : ", secondId);
                    return [4 /*yield*/, contractWrite.request(secondId)];
                case 4:
                    writen2 = _a.sent();
                    console.log("Written Two " + writen2.hash);
                    provider2 = new ethers_1.ethers.providers.WebSocketProvider("websocket URl");
                    contractRead = new ethers_1.ethers.Contract(contractAddress_OueryOracle, lensOracle_1.abi2, provider2);
                    contractRead.on('ResponseReceived', function (id, pair, value, s1, s2, s3, nature) { return __awaiter(_this, void 0, void 0, function () {
                        var score;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    score = parseInt(value._hex, 16);
                                    console.log("Idd:", id, "pair", pair, "score", score, "s1", s1, "s2", s2, "nature", nature);
                                    if (pair == pid && score1 == 0) {
                                        setScore1(score);
                                        setn1(nature);
                                        seta1(parseInt(s1._hex, 16));
                                        seta2(parseInt(s2._hex, 16));
                                        seta3(parseInt(s3._hex, 16));
                                        console.log("Socre1:", score1);
                                    }
                                    if (!(pair == secondId && score2 == 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, setScore2(score)];
                                case 1:
                                    _a.sent();
                                    console.log("Socre2:", score2);
                                    setn2(nature);
                                    seta4(parseInt(s1._hex, 16));
                                    seta5(parseInt(s1._hex, 16));
                                    seta6(parseInt(s1._hex, 16));
                                    _a.label = 2;
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.log("erros sporrted", error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var fetchProfiles = function () { return __awaiter(_this, void 0, void 0, function () {
        var defaultProfile, err_2;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    defaultProfile = (0, client_1.gql)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\nquery DefaultProfile {\n  defaultProfile(\n    request: { ethereumAddress: \"", "\" }\n  ) {\n    id\n    name\n    bio\n    isDefault\n    attributes {\n      displayType\n      traitType\n      key\n      value\n    }\n    followNftAddress\n    metadata\n    handle\n    picture {\n      ... on NftImage {\n        contractAddress\n        tokenId\n        uri\n        chainId\n        verified\n      }\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n    coverPicture {\n      ... on NftImage {\n        contractAddress\n        tokenId\n        uri\n        chainId\n        verified\n      }\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n    ownedBy\n    stats {\n      totalFollowers\n      totalFollowing\n      totalPosts\n      totalComments\n      totalMirrors\n      totalPublications\n      totalCollects\n    }\n  }\n}\n \n"], ["\nquery DefaultProfile {\n  defaultProfile(\n    request: { ethereumAddress: \"", "\" }\n  ) {\n    id\n    name\n    bio\n    isDefault\n    attributes {\n      displayType\n      traitType\n      key\n      value\n    }\n    followNftAddress\n    metadata\n    handle\n    picture {\n      ... on NftImage {\n        contractAddress\n        tokenId\n        uri\n        chainId\n        verified\n      }\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n    coverPicture {\n      ... on NftImage {\n        contractAddress\n        tokenId\n        uri\n        chainId\n        verified\n      }\n      ... on MediaSet {\n        original {\n          url\n          mimeType\n        }\n      }\n    }\n    ownedBy\n    stats {\n      totalFollowers\n      totalFollowing\n      totalPosts\n      totalComments\n      totalMirrors\n      totalPublications\n      totalCollects\n    }\n  }\n}\n \n"])), address);
                    return [4 /*yield*/, client.query({ query: defaultProfile }).then(function (value) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                /* return profiles with profile pics  */
                                setHandle(value.data.defaultProfile.handle);
                                setId(value.data.defaultProfile.id);
                                return [2 /*return*/];
                            });
                        }); })];
                case 1:
                    response = _a.sent();
                    console.log(address);
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.log({ err: err_2 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var fetchSecondProfile = function () { return __awaiter(_this, void 0, void 0, function () {
        var contractWrite_1, index, profile_1, defaultProfile, err_3;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    contractWrite_1 = new ethers_1.ethers.Contract(contractAddress_OueryOracle, abi_OueryOracle, signer);
                    index = Math.floor(Math.random() * users.length);
                    profile_1 = users[index];
                    defaultProfile = (0, client_1.gql)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["query Profile {\nprofile(request: { profileId: \"", "\" }) {\nid\nname\nbio\nattributes {\ndisplayType\ntraitType\nkey\nvalue\n}\nfollowNftAddress\nmetadata\nisDefault\npicture {\n... on NftImage {\ncontractAddress\ntokenId\nuri\nverified\n}\n... on MediaSet {\noriginal {\nurl\nmimeType\n}\n}\n__typename\n}\nhandle\ncoverPicture {\n... on NftImage {\ncontractAddress\ntokenId\nuri\nverified\n}\n... on MediaSet {\noriginal {\nurl\nmimeType\n}\n}\n__typename\n}\nownedBy\ndispatcher {\naddress\ncanUseRelay\n}\nstats {\ntotalFollowers\ntotalFollowing\ntotalPosts\ntotalComments\ntotalMirrors\ntotalPublications\ntotalCollects\n}\nfollowModule {\n... on FeeFollowModuleSettings {\ntype\namount {\nasset {\nsymbol\nname\ndecimals\naddress\n}\nvalue\n}\nrecipient\n}\n... on ProfileFollowModuleSettings {\ntype\n}\n... on RevertFollowModuleSettings {\ntype\n}\n}\n}\n}"], ["query Profile {\nprofile(request: { profileId: \"", "\" }) {\nid\nname\nbio\nattributes {\ndisplayType\ntraitType\nkey\nvalue\n}\nfollowNftAddress\nmetadata\nisDefault\npicture {\n... on NftImage {\ncontractAddress\ntokenId\nuri\nverified\n}\n... on MediaSet {\noriginal {\nurl\nmimeType\n}\n}\n__typename\n}\nhandle\ncoverPicture {\n... on NftImage {\ncontractAddress\ntokenId\nuri\nverified\n}\n... on MediaSet {\noriginal {\nurl\nmimeType\n}\n}\n__typename\n}\nownedBy\ndispatcher {\naddress\ncanUseRelay\n}\nstats {\ntotalFollowers\ntotalFollowing\ntotalPosts\ntotalComments\ntotalMirrors\ntotalPublications\ntotalCollects\n}\nfollowModule {\n... on FeeFollowModuleSettings {\ntype\namount {\nasset {\nsymbol\nname\ndecimals\naddress\n}\nvalue\n}\nrecipient\n}\n... on ProfileFollowModuleSettings {\ntype\n}\n... on RevertFollowModuleSettings {\ntype\n}\n}\n}\n}"])), profile_1);
                    setsecondId(profile_1);
                    return [4 /*yield*/, client.query({ query: defaultProfile }).then(function (value) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                /* return profiles with profile pics  */
                                //console.log("second Player", value.data.profile.handle);
                                setsecondP(value.data.profile.handle);
                                setsecondId(profile_1);
                                setSecondAddress(value.data.profile.ownedBy);
                                return [2 /*return*/];
                            });
                        }); })
                        //console.log(address)
                    ];
                case 1:
                    response = _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    console.log({ err: err_3 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    function mintNft() {
        return __awaiter(this, void 0, void 0, function () {
            var nftContract, contractWrite2, writen2, writen2, writen3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        provider = new ethers_1.ethers.providers.Web3Provider(window.ethereum);
                        provider.send('eth_requestAccounts', []);
                        signer = provider.getSigner();
                        nftContract = "0x16cb27EB3B6e2c3dA78e08f54F41b329a6C0B1F3";
                        contractWrite2 = new ethers_1.ethers.Contract(nftContract, message_1.abi4, signer);
                        //console.log("Adderss 2nd",secondAddress);
                        setProfile("oo");
                        if (!(score1 > score2 && score2 != 0)) return [3 /*break*/, 2];
                        console.log('Player 1 is winner');
                        alert("Winner is Player 1");
                        return [4 /*yield*/, contractWrite2.train()];
                    case 1:
                        writen2 = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(score1 == score2 && score1 != 0)) return [3 /*break*/, 5];
                        console.log("That's a Draw");
                        alert("That's a Draw");
                        return [4 /*yield*/, contractWrite2.train()];
                    case 3:
                        writen2 = _a.sent();
                        return [4 /*yield*/, contractWrite2.trainop(secondAddress, { gasLimit: 5000000 })];
                    case 4:
                        writen3 = _a.sent();
                        _a.label = 5;
                    case 5:
                        if (score2 > score1) {
                            alert("Player 2 has higher scores,use attacks");
                            setScore2(score2 - score1);
                            setScore1(0);
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    return (<>

      <div className="w-9/12 h-4/6 mt-6 flex items-start justify-between bg-black bg-[url('/images/battle-arena.png')] bg-[77%]">

        {/*     {winner && <Confetti
      width={width}
      height={height}
    />} */}
        <div className="w-4/12 p-2 ml-10 mt-10 card sm:p-8 text-primary-100">
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{handle}</h5>
          <h5 className="text-xl font-bold font-jose">{score1}</h5>
          <p className="text-base font-jose">{pid}</p>
          <p className="text-base font-jose">Nature: {n1}</p>
          <p className="text-base font-jose">Attack 1  {a1}</p>
          <p className="text-base font-jose">Attack 2  {a2}</p>
          <p className="text-base font-jose">Attack 3 {a3}</p>

        </div>
        <img src='/images/avatar-left.png' alt='avtar head' className={"rounded-full filter drop-shadow-lg ".concat(isButtonClicked ? 'translate-x-16 transition-transform' : '')} width={225} height={225}/>
        <div className='self-center'>
          <h1 className="text-8xl mb-5 text-center font-extrabold tracking-tight leading-none customText font-vt">VS</h1>
          <button onClick={handleEvent} className='play-battle-btn font-jose'>BATTLE</button>
          <button onClick={specialAttacks} className='play-battle-btn font-jose'>Use Attacks</button>

        </div>
        <img src='/images/avatar-right.png' alt='avtar head' className={"rounded-full filter drop-shadow-lg ".concat(isButtonClicked ? '-translate-x-16 transition-transform' : '')} width={225} height={225}/>
        <div className="w-4/12 p-2 mr-10 mt-10 card sm:p-8 text-primary-100">
          <h5 className="text-xl font-bold font-jose max-w-[20%]">{(secondP)}</h5>
          <h5 className="text-xl font-bold font-jose">{score2}</h5>
          <p className="text-base font-jose">{secondId}</p>
          <p className="text-base font-jose">Nature: {n2}</p>
          <p className="text-base font-jose">Attack 1  {a4}</p>
          <p className="text-base font-jose">Attack 2  {a5}</p>
          <p className="text-base font-jose">Attack 3 {a6}</p>
        </div>
      </div>
    </>);
}
exports.default = Play;
var templateObject_1, templateObject_2;
