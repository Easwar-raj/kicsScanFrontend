import React, { useEffect, useState } from "react";
import vulnerabilities from "./data";
import { FaGithub } from "react-icons/fa";

export function KicsScan() {
    const [vulnerabilityData, setvulnerabilityData] = useState([]);
    const [selectedVulnerability, setselectedVulnerability] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;
    const severityColors = {
        Critical: "bg-red-700 text-white",
        High: "bg-orange-500 text-white",
        Medium: "bg-amber-400 text-gray-900",
        Low: "bg-emerald-500 text-white",
    };
    useEffect(()=> {
        setvulnerabilityData(vulnerabilities);
    },[])
    if (!vulnerabilityData) return <div className="text-center p-6">Loading...</div>;
    const totalPages = Math.ceil(vulnerabilityData.length / rowsPerPage);
    const paginatedData = vulnerabilityData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );
    return (
        <div className="max-w-6xl mx-auto my-10 p-6 bg-white">
            {/* Header */}
            <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <FaGithub size={28} className="text-black" />
                    <h1 className="text-3xl font-bold text-gray-800">Git Leaks</h1>
                </div>
                <p className="text-gray-500 mt-1">Detected vulnerabilities from repository scan</p>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sno</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Secret Name</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Secret Type</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Severity Level</th>
                            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(paginatedData) &&
                        paginatedData.map((vulnerability, indx) => (
                            <tr
                            key={indx}
                            className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50 transition-colors"
                            >
                                <td className="px-4 py-3 text-sm text-gray-700">{(currentPage - 1) * rowsPerPage + indx + 1}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-800">{vulnerability.secret_name}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{vulnerability.secret_type}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center justify-center w-20 h-7 text-sm font-semibold rounded-md shadow-sm ${
                                            severityColors[vulnerability.severity_level] || "bg-gray-300 text-gray-800"
                                        }`}
                                    >
                                        {vulnerability.severity_level}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-center">
                                    <button
                                        type="button"
                                        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                                        onClick={()=>setselectedVulnerability(vulnerability)}
                                    >
                                    View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            {selectedVulnerability && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg p-6 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold text-gray-800">Vulnerability Details</h2>
                            <button
                                onClick={() => setselectedVulnerability(null)}
                                className="text-sm text-gray-500 hover:text-gray-700 transition"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
                            <div>
                                <p className="text-xs text-gray-600">Secret Name</p>
                                <p className="font-medium text-gray-800">{selectedVulnerability.secret_name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">Secret Type</p>
                                <p className="font-medium text-gray-800">{selectedVulnerability.secret_type}</p>
                            </div>
                            <div className="flex flex-col items-start gap-1">
                                <p className="text-xs text-gray-600">Severity</p>
                                <span
                                    className={`inline-flex items-center justify-center w-20 h-6 text-sm font-semibold rounded-md shadow-sm ${
                                        severityColors[selectedVulnerability.severity_level] || "bg-gray-300 text-gray-800"
                                    }`}
                                >
                                    {selectedVulnerability.severity_level}
                                </span>
                            </div>
                            <div>
                                <p className="text-xs text-gray-600">File Path</p>
                                <p className="font-mono text-sm text-gray-700">{selectedVulnerability.affected_file_path}</p>
                            </div>
                        </div>

                        <div className="bg-gray-900 text-gray-100 rounded-lg overflow-hidden shadow-md mb-6">
                            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-300">
                                <span>{selectedVulnerability.affected_file_path}</span>
                            </div>
                            <pre className="px-4 py-3 text-sm overflow-x-auto flex gap-4 items-center">
                                <span className="text-gray-400">{selectedVulnerability.line_number}</span>
                                <code>{selectedVulnerability.code_snippet}</code>
                            </pre>
                        </div>

                        <div className="grid sm:grid-cols-3 gap-4 mb-6 bg-blue-50 p-4 rounded-lg">
                            <div>
                                <p className="text-xs text-blue-600">Author</p>
                                <p className="font-medium text-blue-900">{selectedVulnerability.author}</p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-600">Commit Hash</p>
                                <p className="font-mono text-sm text-blue-800">{selectedVulnerability.commit_hash}</p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-600">Timestamp</p>
                                <p className="text-sm text-blue-800">{selectedVulnerability.timestamp}</p>
                            </div>
                        </div>

                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <p className="font-semibold text-gray-800 mb-2">Security Reference</p>
                            <a
                                href={`https://cwe.mitre.org/data/definitions/${selectedVulnerability.cwe.split(":")[0].split("-")[1]}.html`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline"
                            >
                                {selectedVulnerability.cwe}
                            </a>
                        </div>

                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                            <p className="font-semibold text-green-800 mb-2">Remediation</p>
                            <p className="text-green-700 leading-relaxed">{selectedVulnerability.remediation}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}