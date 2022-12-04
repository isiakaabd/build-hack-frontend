export const abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_companyManager",
        type: "address",
      },
      {
        internalType: "contract USDCInterface",
        name: "_contractAddr",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "AddressZero",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyInitialized",
    type: "error",
  },
  {
    inputs: [],
    name: "AlreadyRegistered",
    type: "error",
  },
  {
    inputs: [],
    name: "InsufficientFunds",
    type: "error",
  },
  {
    inputs: [],
    name: "NotApproved",
    type: "error",
  },
  {
    inputs: [],
    name: "NotManager",
    type: "error",
  },
  {
    inputs: [],
    name: "NotVerified",
    type: "error",
  },
  {
    inputs: [],
    name: "TimeNotReached",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroAmount",
    type: "error",
  },
  {
    inputs: [],
    name: "salaryAmountError",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "depositor",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Deposit",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "oldCompanyManager",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "companyManager",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "ManagerUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "caller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "time",
        type: "uint256",
      },
    ],
    name: "Registered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "employee",
        type: "address",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_companyManager",
        type: "address",
      },
    ],
    name: "changeCompanyManager",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "companyManager",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_post",
        type: "string",
      },
      {
        internalType: "enum Payroll.EmployeeLevel",
        name: "_level",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "fillSalaryInvoice",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractTokenBalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getEmployeeCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "getEmployeeDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "address",
            name: "employeeAddress",
            type: "address",
          },
          {
            internalType: "string",
            name: "post",
            type: "string",
          },
          {
            internalType: "enum Payroll.EmployeeLevel",
            name: "level",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "timeFilled",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "registered",
            type: "bool",
          },
          {
            internalType: "enum Payroll.Status",
            name: "status",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "pendingReview",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "timeOfPendingReview",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timeOfApproval",
            type: "uint256",
          },
        ],
        internalType: "struct Payroll.EmployeeInfo",
        name: "EI",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "getEmployeeStatus",
    outputs: [
      {
        internalType: "enum Payroll.EmployeeLevel",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberofDays",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
      {
        internalType: "string",
        name: "_post",
        type: "string",
      },
      {
        internalType: "enum Payroll.EmployeeLevel",
        name: "_level",
        type: "uint8",
      },
    ],
    name: "registerInfo",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "reviewApproved",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "reviewInProgress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "reviewSalaryInvoice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "extrafee",
        type: "uint256",
      },
    ],
    name: "setEmployeeSalary",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "showMyRegistrationStatus",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalRegisteredEmployee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "contract USDCInterface",
        name: "stablecoin",
        type: "address",
      },
    ],
    name: "updateTokenAddress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "usdcContractAddress",
    outputs: [
      {
        internalType: "contract USDCInterface",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_employeeAddress",
        type: "address",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdrawContractBal",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];
