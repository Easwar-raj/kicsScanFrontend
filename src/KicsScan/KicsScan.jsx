import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

export function KicsScan() {
    const [vulnerabilityData, setvulnerabilityData] = useState();
    useEffect(()=> {
        const vulnerability = {
            secret_name: "AWS Access Key",
            description: "A potential secret was detected in the source code. This may expose sensitive credentials.",
            severity_level: "High",
            first_detected: "2025-08-18T12:34:56Z",
            secret_type: "Key",
            affected_file_path: "config/aws_keys.py",
            line_number: 42,
            code_snippet: "aws_access_key_id = \"AKIA***\"",
            commit_hash: "a1b2c3d4",
            author: "John Doe",
            timestamp: "2025-08-18T12:01:00Z",
            platform: "hts-secretscanner",
            cwe: "CWE-798: Use of Hard-coded Credentials",
            remediation: "Remove hardcoded secrets and use a secure secret manager."
        };
        setvulnerabilityData(vulnerability);
    },[])
    if (!vulnerabilityData) return <div className="text-center p-6">Loading...</div>;
    return (
        <div className="max-w-4xl mx-auto my-10 p-8 bg-gradient-to-br from-indigo-50 to-white shadow-xl rounded-xl border border-indigo-200 space-y-6">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                <h2 className="text-3xl font-bold text-indigo-800 flex items-center gap-2">
                    🔐 {vulnerabilityData.secret_name}
                </h2>
                <p className="text-sm text-indigo-500 mt-1">
                    {vulnerabilityData.secret_type} • Detected by <span className="font-medium">{vulnerabilityData.platform}</span>
                </p>
                </div>
                <span
                className={`text-sm font-semibold px-4 py-1 rounded-full border shadow-sm ${
                    vulnerabilityData.severity_level === "High"
                    ? "bg-red-500 text-white border-red-600"
                    : vulnerabilityData.severity_level === "Medium"
                    ? "bg-yellow-400 text-gray-900 border-yellow-500"
                    : "bg-green-500 text-white border-green-600"
                }`}
                >
                {vulnerabilityData.severity_level}
                </span>
            </div>

            {/* Description */}
            <div>
                <h3 className="text-xl font-semibold text-indigo-700 mb-1">📝 Description</h3>
                <p className="text-gray-700 leading-relaxed text-base">
                {vulnerabilityData.description}
                </p>
            </div>

            {/* Affected File */}
            <div className="bg-white p-5 rounded-lg border border-indigo-100 shadow-sm">
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">📄 Affected File</h3>
                <p className="text-gray-800 text-sm">
                {vulnerabilityData.affected_file_path} <span className="text-gray-500">(Line {vulnerabilityData.line_number})</span>
                </p>
                <pre className="bg-gray-800 text-green-400 mt-3 p-4 rounded-lg text-sm overflow-auto font-mono">
                {vulnerabilityData.code_snippet}
                </pre>
            </div>

            {/* Metadata Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h3 className="text-md font-semibold text-indigo-600 mb-2">👤 Author Info</h3>
                <p className="text-gray-700 text-sm"><strong>Name:</strong> {vulnerabilityData.author}</p>
                <p className="text-gray-700 text-sm"><strong>Commit:</strong> {vulnerabilityData.commit_hash}</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-indigo-100">
                <h3 className="text-md font-semibold text-indigo-600 mb-2">🕒 Timestamps</h3>
                <p className="text-gray-700 text-sm"><strong>First Detected:</strong> {new Date(vulnerabilityData.first_detected).toUTCString()}</p>
                <p className="text-gray-700 text-sm"><strong>Commit Time:</strong> {new Date(vulnerabilityData.timestamp).toUTCString()}</p>
                </div>
            </div>

            {/* CWE & Remediation */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-5 rounded-lg">
                <h3 className="text-lg font-semibold text-indigo-700 mb-1">⚠️ Vulnerability Details</h3>
                <p className="text-indigo-900 text-sm mb-1"><strong>{vulnerabilityData.cwe}</strong></p>
                <p className="text-indigo-800 text-sm"><strong>💡 Remediation:</strong> {vulnerabilityData.remediation}</p>
            </div>
        </div>
    );
}